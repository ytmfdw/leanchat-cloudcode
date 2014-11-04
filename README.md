## Leanchat 项目构成
* [Leanchat-android](https://github.com/leancloud/leanchat)
* [Leanchat-ios](https://github.com/leancloud/leanchat-ios)
* [Leanchat-cloud-code](https://github.com/leancloud/leanchat-cloudcode)，Leanchat 云代码后端

Cloud code project for ChatDemo. Cloud Code Guide: https://leancloud.cn/docs/cloud_code_guide.html


有双向添加好友、双向删除好友的示例，核心代码：

https://github.com/leancloud/AdventureCloud/blob/master/cloud/main.js

https://github.com/leancloud/AdventureCloud/blob/master/cloud/muser.js


服务端三个接口：

* `addFriend` 双向添加好友，需要参数`fromUserId`,`toUserId`
* `removeFriend`，双向移除好友，参数同上
* `tryCreateAddRequest`，尝试发出添加好友的请求，若已存在等待验证的请求，返回Error("已经发过请求了")，否则创建一条`AddRequest`记录
