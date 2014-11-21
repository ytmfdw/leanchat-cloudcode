[LeanCloud 镜像下载地址](https://download.leancloud.cn/demo/)

## Leanchat 项目构成

* [Leanchat-android](https://github.com/leancloud/leanchat)
* [Leanchat-ios](https://github.com/leancloud/leanchat-ios)
* [Leanchat-cloud-code](https://github.com/leancloud/leanchat-cloudcode)，Leanchat 云代码后端

Cloud code project for ChatDemo. Cloud Code Guide: https://leancloud.cn/docs/cloud_code_guide.html



服务端接口：

* `addFriend` ，双向添加好友，需要参数`fromUserId`,`toUserId`
* `removeFriend`，双向移除好友，参数同上
* `tryCreateAddRequest`，尝试发出添加好友的请求，若已存在等待验证的请求，返回Error("已经发过请求了")，否则创建一条`AddRequest`记录
* `sign`，对单聊的watch进行签名
* `group_sign`，对群组操作进行签名

或者见[main.js](https://github.com/leancloud/AdventureCloud/blob/master/cloud/main.js)
