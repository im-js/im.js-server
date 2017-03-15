'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.02.10 10:22:43
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 用户表
 */

const cloverx = require('cloverx');
const S = cloverx.S;

module.exports = {
    fields: {
        userId: {
            primaryKey: true,
            type: S.INTEGER(11).UNSIGNED,
            // 如果为空，则默认值是将键名从 camelCase 转换为 underscore
            field: 'id',
            allowNull: false,
            autoIncrement: true,
            comment: '用户 ID'
        },
        avatar: {
            type: S.STRING(250),
            allowNull: false,
            comment: '头像地址'
        },
        name: {
            type: S.STRING(32),
            allowNull: false,
            comment: '用户名'
        },
        firstLetter: {
            type: S.STRING(1),
            allowNull: false,
            comment: '用户首字母'
        },
        phone: {
            type: S.STRING(11),
            allowNull: false,
            comment: '用户手机号'
        },
        socketId: {
            type: S.STRING(64),
            allowNull: false,
            comment: '当前 socketId'
        },
        status: {
            type: S.ENUM('online', 'offline', 'delete'),
            allowNull: false,
            defaultValue: 'offline',
            comment: '用户在线状态'
        },
        vibration: {
            type: S.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            comment: '是否开启震动'
        }
    },
    comment: '用户表'
};
