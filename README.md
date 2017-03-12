# im-server
>[im-client](https://github.com/plusmancn/im-client) 服务端代码

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
