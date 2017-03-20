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
const io = require('socket.io')(cloverx.server);

const modelUser = cloverx.model.get('user');
const modelMessage = cloverx.model.get('message');

io.on('connection', function (socket) {
    socket.on('message', function (payloads) {
        modelMessage.sendPeerMessage(socket, payloads);
    });

    socket.on('disconnect', function () {
        modelUser.changeUserOnlineStatus(socket.id, 'offline');
    });

    socket.on('user:online', function (data) {
        modelMessage.sendOfflineMessage(socket, data.userId);
    });
});
