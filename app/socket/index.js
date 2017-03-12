'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.02.10 00:39:25
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * socket 服务器入口文件
 */

// 启动 socket.io
const cloverx = require('cloverx');
const uuid = require('uuid');
const moment = require('moment');
const io = require('socket.io')(cloverx.server);

const modelUser = cloverx.model.get('user');

io.on('connection', function (socket) {
    socket.on('peerMessage', function (data) {
        sendPeerMessage(socket, data);
    });
});

// 私聊消息
async function sendPeerMessage(socket, data) {
    let user = await modelUser.getByUserId(data.to);
    if (user.socketId) {
        data.uuid = data.uuid || uuid.v4();
        data.ext.displayTime = moment().startOf('minute').fromNow();
        data.ext.timestamp = +(new Date());
        socket
            .to(user.socketId)
            .emit('message', data);
    }
}
