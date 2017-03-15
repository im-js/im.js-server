'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.02.10 11:31:39
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 用户信息维护-控制器
 */

const cloverx = require('cloverx');
const modelUser = cloverx.model.get('user');

let router = new cloverx.Router();
let V = cloverx.validator;

/**jsdoc
 * 用户注册
 * @tags user
 * @httpMethod post
 * @path /
 * @param {string#formData} name - 用户名，长度小于 20
 * @param {string#formData} phone - 用户手机号
 * @param {string#formData} socketId - 系统分配的通道 id
 * @response @UserInfo
 */
router.push({
    method: 'post',
    path: '/',
    body: {
        name: V.string().max(20).required(),
        phone: V.string().regex(/^1\d{10}$/).required(),
        socketId: V.string().empty('').optional()
    },
    processors: [
        async (ctx, next) => {
            let body = ctx.filter.body;
            let result = await modelUser.login(
                body.name,
                body.phone,
                body.socketId
            );

            ctx.body = cloverx
                .checker
                .module('@UserInfo')
                .checkAndFormat(result);
            return next();
        }
    ]
});

/**jsdoc
 * 更新用户属性
 * @tags user
 * @httpMethod put
 * @path /:userId/property/:field
 * @param {string#path} userId - 用户ID
 * @param {string#path} field - 需要更新的属性
 * @param {string#formData} value - 更新值
 * @response @UserInfo
 */
router.push({
    method: 'put',
    path: '/:userId/property/:field',
    params: {
        userId: V.string().required(),
        field: V.string().required()
    },
    body: {
        value: V.any().required()
    },
    processors: [
        async (ctx, next) => {
            let result = await modelUser.modifyUserInfo(
                    ctx.filter.params.userId,
                    ctx.filter.params.field,
                    ctx.filter.body.value
            );
            ctx.body = cloverx
                .checker
                .module('@UserInfo')
                .checkAndFormat(result);

            return next();
        }
    ]
});

/**jsdoc
 * 在线用户列表
 * @tags user
 * @httpMethod get
 * @path /online/list
 * @response {:[@UserInfo]}
 */
router.push({
    method: 'get',
    path: '/online/list',
    processors: [
        async (ctx, next) => {
            let result = await modelUser.list();

            ctx.body = cloverx
                .checker
                .module('{:[@UserInfo]}')
                .checkAndFormat(result);

            return next();
        }
    ]
});

/**jsdoc
 * 用户登出
 * @tags user
 * @httpMethod delete
 * @path /:userId/status
 * @param {integer#path} userId - 需要登出的用户ID
 * @response @UserInfo
 */
router.push({
    method: 'delete',
    path: '/:userId/status',
    params: {
        userId: V.number().required()
    },
    processors: [
        async (ctx, next) => {
            let result = await modelUser.logout(ctx.filter.params.userId);

            ctx.body = cloverx
                .checker
                .module('@UserInfo')
                .checkAndFormat(result);

            return next();
        }
    ]
});

module.exports = router;
