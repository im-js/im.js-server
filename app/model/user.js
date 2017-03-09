'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.02.10 13:56:21
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 用户信息维护-模型
 */

const cloverx = require('cloverx');
const schemaUser = cloverx.mysql.get('chat/user');

/**
 * 用户注册
 */
async function login (name, phone, socketId = '') {
    let user = await schemaUser.findOne({
        where: {
            phone: phone
        }
    });

    if(user && user.status === 'online') {
        throw cloverx.Error.badParameter(`手机用户 ${phone} 已经在线`);
    }

    let result;
    if(user) {
        result = await user.update({
            name: name,
            socketId: socketId,
            status: 'online'
        });
    } else {
        result = await schemaUser
        .build({
            name: name,
            phone: phone,
            socketId: socketId,
            status: 'online'
        })
        .save();
    }

    return result;
}

/**
 * 用户登出
 */
async function logout(userId) {
    let user = await schemaUser.findOne({
        where: {
            userId: userId
        }
    });

    if(!user) {
        throw cloverx.Error.badParameter(`用户ID ${userId} 不存在`);
    }

    return await user.update({
        status: 'offline'
    });
}

/**
 * 拉取在线用户列表
 */
async function list(status) {
    let where = {};
    if(status) {
        where.status = status;
    }

    let result = await schemaUser.findAll({
        attributes: ['userId', 'name', 'phone', 'socketId', 'status'],
        where,
        order: [
            ['updatedAt', 'desc']
        ],
        raw: true
    });

    return result;
}

module.exports = {
    login,
    logout,
    list
};
