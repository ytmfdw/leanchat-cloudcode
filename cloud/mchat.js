var mlog = require('cloud/mlog');
var muser = require('cloud/muser');
var util = require('util');
var mutil = require('cloud/mutil');

var msgTypeText = -1;
var msgTypeImage = -2;
var msgTypeAudio = -3;
var msgTypeLocation = -5;

function messageReceived(req, res) {
  res.success();
}

function getPushMessage(params) {
  var contentStr = params.content;
  var json = {
    badge: "Increment",
    sound: "default"
//    ,"_profile": "dev"      //设置证书，开发时用 dev，生产环境不设置
  };
  var msg = JSON.parse(contentStr);
  var msgDesc = getMsgDesc(msg);
  var username = getUsername(msg);
  if (username) {
      json.alert = username + ' : ' + msgDesc;
  } else {
      json.alert = msgDesc;
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
  } else {
    return msg;
  }
}

function getUsername(msg) {
    if (msg._lcattrs) {
       return msg._lcattrs.username;
    } else {
        return null;
    }
}

function receiversOffline(req, res) {
  if (req.params.convId) {
    // api v2
    res.success({pushMessage: getPushMessage(req.params)});
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
