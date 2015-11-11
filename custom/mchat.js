var mlog = require('./mlog');

var msgTypeText = -1;
var msgTypeImage = -2;
var msgTypeAudio = -3;
var msgTypeVideo = -4;
var msgTypeLocation = -5;
var msgTypeEmotion = 1;

function messageReceived(req, res) {
  res.success();
}

function getPushMessage(params) {
  var contentStr = params.content;
  var json = {
    badge: "Increment",
    sound: "default",
    convid: params.convId     //来支持点击弹框，跳转至相应对话
//    ,"_profile": "dev"      //设置证书，开发时用 dev，生产环境不设置
  };
  var msg = JSON.parse(contentStr);
  var msgDesc = getMsgDesc(msg);
  if (msg._lcattrs && msg._lcattrs.username) {
      json.alert = msg._lcattrs.username + ' : ' + msgDesc;
  } else {
      json.alert = msgDesc;
  }
  if (msg._lcattrs && msg._lcattrs.dev) {
    json._profile = "dev";
  }
  return JSON.stringify(json);
}

function getMsgDesc(msg) {
  var type = msg._lctype;
  if (type == msgTypeText) {
    return msg._lctext;
  } else if (type == msgTypeImage) {
    return "图片";
  } else if (type == msgTypeAudio) {
    return "声音";
  } else if (type == msgTypeLocation) {
    return msg._lctext;
  } else if (type == msgTypeEmotion){
    return "动态表情";
  } else if (type == msgTypeVideo) {
    return "视频";
  } else {
    return "未知消息";
  }
}

function receiversOffline(req, res) {
  if (req.params.convId) {
    // api v2
    try{
      var pushMessage = getPushMessage(req.params);
      res.success({pushMessage: pushMessage});
    } catch(err) {
      // json parse error
      res.success();
    }
  } else {
    console.log("receiversOffline , conversation id is null");
    res.success();
  }
}

function conversationStart(req,res){
  console.log('conversationStart');
  res.success();
}

function conversationRemove(req,res){
  console.log('conversationRemove');
  res.success();
}

function conversationAdd(req,res){
  console.log('conversationAdd');
  res.success();
}

exports.messageReceived = messageReceived;
exports.receiversOffline = receiversOffline; // used by main.js
exports.getPushMessage = getPushMessage;
exports.conversationStart=conversationStart;
exports.conversationRemove=conversationRemove;
exports.conversationAdd=conversationAdd;
