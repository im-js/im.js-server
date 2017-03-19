'use strict';
/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 plusmancn, all rights
 * reserved.
 *
 * 消息管理，基于 redis
 */
const uuid = require('uuid');

const cloverx = require('cloverx');
const modelUser = cloverx.model.get('user');
const redis = cloverx.connection.get('redis').get('main');

/**
 * 私聊消息
 * 判断将用户消息存入队列还是直接发送
 */
async function sendPeerMessage(socket, payloads) {
    let user = await modelUser.getByUserId(payloads[0].to);

    // 补充消息内容
    payloads = payloads.map((payload) => {
        payload.uuid = payload.uuid || uuid.v4();
        payload.ext.timestamp = +(new Date());
        return payload;
    });

    if (user.status === 'online' && user.socketId) {
        socket
            .to(user.socketId)
            .emit('message', payloads);
    } else {
        let serialPayloads = payloads.map((payload) => {
            return JSON.stringify(payload);
        });
        redis.rpush(`offline:queue:userId:${user.userId}`, ...serialPayloads);
    }
}

/**
 * 私聊消息
 * 将用户离线消息推送给用户，离线消息封顶 1000 条
 */
async function sendOfflineMessage(socket, userId) {
    let redisKey = `offline:queue:userId:${userId}`;
    let queue = await redis.lrange(redisKey, 0, -1);
    if(!queue.length) {
        return;
    }

    let payloads = queue.map((item) => {
        return JSON.parse(item);
    });

    // 数据拆分
    let payloadsDict = new Map();
    for(let i = 0; i < payloads.length; i++) {
        let payload = payloads[i];
        let { from } = payload;

        if (payloadsDict.get(from)) {
            payloadsDict.get(from).push(payload);
        } else {
            payloadsDict.set(from, [payload]);
        }
    }

    for (let value of payloadsDict.values()) {
        socket
            .emit('message', value);
    }

    // 收到 Ack 后，清空离线队列
    await redis.del(redisKey);
}

module.exports = {
    sendPeerMessage,
    sendOfflineMessage
};
