# ☘cloverx-starter
只含基本目录结构，示例参考 [cloverx/examples](https://github.com/clover-x/cloverx/tree/master/example/app)

## Usage
安装依赖，只能使用`npm`
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
    }
}
```
