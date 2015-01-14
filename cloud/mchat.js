var mlog = require('cloud/mlog');
var muser=require('cloud/muser');
var util=require('util');

var msgTypeText=0;
var msgTypeImage=1;
var msgTypeAudio=2;
var msgTypeLocation=3;

function messageReceived(req, res) {
  //mlog.logObject(req.params,true);
  //console.log('messageReceived');
  res.success();
}

function getPushMessage(params){
  var p=new AV.Promise();
  var contentStr=params.content;
  var json={
    badge:"Increment",
    sound:"default"
  };
  var msg=JSON.parse(contentStr);
  var msgDesc=getMsgDesc(msg);
  var fromPeerId=params.fromPeer;
  muser.findUsernameById(fromPeerId).then(function(name){
    if(name){
      json.alert=name+' : '+msgDesc;
    }else{
      json.alert=msgDesc;
    }
    p.resolve(JSON.stringify(json));
  });
  return p;
}

function getMsgDesc(msg){
  if(msg.type==msgTypeText){
    if(/\\u1f[a-z0-9]{3}/.test(msg.content)){
      return "表情";
    }else{
      return msg.content;
    }
  }else if(msg.type==msgTypeImage){
    return "图片";
  }else if(msg.type==msgTypeAudio){
    return "声音";
  }else if(msg.type==msgTypeLocation){
    return msg.content;
  }else{
    return msg.content;
  }
}

function receiversOffline(req, res) {
  //mlog.logObject(req.params,true);
  var p=getPushMessage(req.params);
  p.then(function(pushMessage){
    res.success({'pushMessage':pushMessage});
  });
}

exports.messageReceived = messageReceived;
exports.receiversOffline = receiversOffline;
exports.getPushMessage=getPushMessage;