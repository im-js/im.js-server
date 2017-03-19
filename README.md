# im.js.server
>[im.js](https://github.com/plusmancn/im.js) 服务端代码

## Usage
```shell
npm install
```
启动
```shell
npm run dev
```

## 消息体格式约定
**txt**  
```javascript
{
    from: String('用户ID'),
    to: String('用户ID'),
    uuid: '消息唯一UUID',
    msg: {
        type: 'txt',
        content: '文本内容',
    },
    ext: {
        avatar: String('用户头像地址'),
        name: String('用户姓名'),
        timestamp: timestamp(毫秒), // 可使用 moment().startOf('minute').fromNow() 格式化
    },
    // 不参与网络传输，本地传递拓展字段位置
    localeExt: {
    }
}
```

## 消息 ACK

## 离线消息机制
基于 `Redis` 实现，单用户离线队列命名规则为 `offline:queue:userId:${userId}`，存储结构为 `Lists`。

当用户上线时候，客户端向服务器发送 `user:online` 事件，服务器以数组的形式返回对应用户的离线消息。

## 用户状态裁决
AppState 状态与 socket 状态

State      | background | inactive | active
:----------|:-----------|:---------|:-------
socket-ios | disconnect | connect  | connect
