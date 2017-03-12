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
        displayTime: String('消息时间') = moment().startOf('minute').fromNow(),
        timestamp: timestamp(毫秒)
    }
}
```
