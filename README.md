# LeanChat 服务端

LeanChat 服务端主要有以下功能：

* 实现了自定义推送消息 的 Hook，让推送消息像`老王：约吗？`，体验更好
* 实现了聊天签名，将签名传递给客户端，让聊天更安全。
* 实现了互相取消关注的 Hook，用于解除好友关系。

一般地你可能需要第一个。如果对安全有要求，可能需要第二个。第三个是关于好友关系的，如果用了 LeanCloud 的用户系统且有好友关系需求，可能需要这个。

## 验证签名算法

签名逻辑可能实现在了您的服务器上，没有用 LeanCloud 的 LeanEngine 功能，可以前往 https://leanchat-server.avosapps.com/convSign 来校验签名算法是否正确。

## LeanChat 项目构成

* [leanchat-android](https://github.com/leancloud/leanchat-android)，Android 客户端
* [leanchat-ios](https://github.com/leancloud/leanchat-ios)，iOS 客户端
* [leanchat-webapp](https://github.com/leancloud/leanchat-webapp)，Web 客户端
* [leanchat-cloud-code](https://github.com/leancloud/leanchat-cloudcode)，服务端

## 部署服务端

1. fork
2. 管理台在云代码相关位置填写地址
3. 管理台点击部署

## 文档

* git 仓库部署：[相关文档](https://leancloud.cn/docs/cloud_code_guide.html#部署代码)
* 命令行工具部署：[相关文档](https://leancloud.cn/docs/cloud_code_commandline.html#部署)
