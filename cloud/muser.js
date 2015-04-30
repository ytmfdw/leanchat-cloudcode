/**
 * Created by lzw on 14-9-29.
 */
var mutil = require('cloud/mutil');
var mlog = require('cloud/mlog');
var _ = require('underscore');
var Avatar = AV.Object.extend('Avatar');

function findUserById(userId, queryFn) {
  var q = new AV.Query('_User');
  if (queryFn) {
    queryFn(q);
  }
  return q.get(userId);
}

function findUser(modifyQueryFn) {
  return mutil.findOne('_User', modifyQueryFn);
}

function findUserByName(name) {
  return findUser(function (q) {
    q.equalTo('username', name);
  });
}

function findUsernameById(id) {
  var p = new AV.Promise();
  findUserById(id).then(function (user) {
    p.resolve(user.get('username'));
  }, function (error) {
    console.log(error.message);
    p.resolve();
  });
  return p;
}

function findUsers(userIds) {
  var q = new AV.Query('_User');
  q.containedIn('objectId', userIds);
  q.include('setting');
  return q.find();
}

function findAllUsers(modifyQueryFn) {
  return mutil.findAll('_User', modifyQueryFn);
}

function deleteFollower(user,follower){
  var q=new AV.Query('_Follower');
  q.equalTo('user',user);
  q.equalTo('follower',follower);
  var p=new AV.Promise();
  q.find().then(function(followers){
    AV.Object.destroyAll(followers).then(function(){
      console.log('succeed delete follower, size = '+followers.length);
      p.resolve();
    },mutil.rejectFn(p));
  },mutil.rejectFn(p));
  return p;
}

function afterDeleteFollowee(req){
  var user=req.object.get('user');
  var followee=req.object.get('followee');
  deleteFollower(followee,user).then(function(){
  },mlog.logErrorFn);
}

exports.findUser = findUser;
exports.findUserById = findUserById;
exports.findAllUsers = findAllUsers;
exports.findUsernameById = findUsernameById;
exports.findUsers = findUsers;
exports.afterDeleteFollowee=afterDeleteFollowee;
exports.deleteFollower=deleteFollower;
