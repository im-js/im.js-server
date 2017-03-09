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
const io = require('socket.io')(cloverx.server);
const userSocketIdMap = new Map();
const socketIdUserMap = new Map();

io.on('connection', function (socket) {
    socket.on('peerMessage', function (data) {
        let to = userSocketIdMap.get(data.to);
        let from = userSocketIdMap.get(data.from);
        socket
            .to(to.socketId)
            .emit('message', {
                content: data.content,
                avatar: from.avatar,
                uuid: data.uuid || uuid.v4()
            });
    });

    socket.on('registry', function (data) {
        userSocketIdMap.set(data.userId, data);
        socketIdUserMap.set(data.socketId, data);
    });
});
