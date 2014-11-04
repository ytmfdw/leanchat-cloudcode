/**
 * Created by lzw on 14/11/4.
 */
var mutil=require('cloud/mutil.js');
var mlog=require('cloud/mlog');
var assert=require('assert');

var statusWait= 0,statusDone=1;
var AddRequest=AV.Object.extend('AddRequest');

function createUser(id){
  return AV.Object.createWithoutData('_User',id);
}

function haveAddRequest(fromUserId,toUserId){
  var p=new AV.Promise();
  var fromUser=createUser(fromUserId);
  var toUser=createUser(toUserId);
  mutil.findOne('AddRequest',function(q){
    q.equalTo('fromUser',fromUser);
    q.equalTo('toUser',toUser);
    q.equalTo('status',statusWait);
  }).then(function(addRequest){
    if(addRequest){
      p.resolve(true);
    }else{
      p.resolve(false);
    }
  },mutil.rejectFn(p));
  return p;
}

function createAddRequest(fromUserId,toUserId){
  assert.notEqual(toUserId,null);
  var fromUser=createUser(fromUserId);
  var toUser=createUser(toUserId);
  var addReq=new AddRequest();
  addReq.set('fromUser',fromUser);
  addReq.set('toUser',toUser);
  addReq.set('status',statusWait);
  return addReq.save();
}

function _tryCreateAddRequest(fromUserId,toUserId){
  var p=new AV.Promise();
  haveAddRequest(fromUserId,toUserId).then(function(have){
    mlog.log('have='+have);
    if(have){
      p.reject(Error('已经请求过了'));
    }else{
      createAddRequest(fromUserId,toUserId).then(function(){
        mlog.log('create');
        p.resolve();
      },mutil.rejectFn(p));
    }
  },mutil.rejectFn(p));
  return p;
}

function tryCreateAddRequest(req,res){
  var fromUserId=req.params.fromUserId;
  var toUserId=req.params.toUserId;
  _tryCreateAddRequest(fromUserId,toUserId).then(function(){
    res.success();
  },mutil.cloudErrorFn(res));
}

exports.tryCreateAddRequest=tryCreateAddRequest;
exports._tryCreateAddRequest=_tryCreateAddRequest;
