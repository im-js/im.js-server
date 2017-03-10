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
const schemaUser = cloverx.mysql.get('im/user');

const RANDOM_AVATAR = [
    'http://image-2.plusman.cn/app/im-client/avatar/tuzki_01.jpg',
    'http://image-2.plusman.cn/app/im-client/avatar/tuzki_02.png',
    'http://image-2.plusman.cn/app/im-client/avatar/tuzki_03.jpg',
    'http://image-2.plusman.cn/app/im-client/avatar/tuzki_04.png',
    'http://image-2.plusman.cn/app/im-client/avatar/tuzki_05.jpeg',
    'http://image-2.plusman.cn/app/im-client/avatar/tuzki_06.jpg',
    'http://image-2.plusman.cn/app/im-client/avatar/tuzki_07.jpg',
    'http://image-2.plusman.cn/app/im-client/avatar/tuzki_08.png'
];

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

    // 随机头像
    let avatar = RANDOM_AVATAR[Math.floor((Math.random() * RANDOM_AVATAR.length))];

    let result;
    if(user) {
        result = await user.update({
            name,
            socketId,
            status: 'online'
        });
    } else {
        result = await schemaUser
        .build({
            name,
            phone,
            avatar,
            socketId,
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
