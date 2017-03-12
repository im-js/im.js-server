'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.03 10:28:11
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 测试项目入口文件
 */

const yargv = require('yargs').argv;
// 变量可选值：development, production
process.env.NODE_ENV = (yargv.env || 'development').toLowerCase();

// moment 配置
require('moment').locale('zh-cn');

// 框架启动
require('cloverx').start({
    baseDir: __dirname,
    cloverEnv: process.env.NODE_ENV
});

// 启动 socket 服务
require('./socket/index.js');

process.on('uncaughtException', (err) => {
    console.error(err);
});

process.on('unhandledRejection', (err) => {
    console.error(err);
});
