'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.10 19:10:43
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 数据类型定义
 */
module.exports = {
    StdResponse: {
        type: 'object',
        description: '标准返回模块',
        properties: {
            success: {
                type: 'boolean',
                description: '请求是否成功'
            },
            code: {
                type: 'number',
                description: '请求状态码，10000 为无错误',
                default: 10000
            },
            msg: {
                type: 'string',
                description: '错误描述'
            }
        }
    },
    UserInfo: {
        type: 'object',
        description: '用户信息',
        properties: {
            userId: {
                type: 'number',
                description: '系统分配的 userId'
            },
            avatar: {
                type: 'string',
                description: '用户头像'
            },
            name: {
                type: 'string',
                description: '用户名'
            },
            phone: {
                type: 'string',
                description: '用户手机号'
            },
            socketId: {
                type: 'string',
                description: '通道 socketId'
            },
            status: {
                type: 'string',
                description: '在线状态'
            },
            vibration: {
                type: 'boolean',
                description: '是否开启震动'
            }
        }
    }
};
