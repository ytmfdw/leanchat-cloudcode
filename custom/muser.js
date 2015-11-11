/**
 * 此类提供了取消关注的一个 Hook, 当 A 取消关注 B 时, 让 B 也取消关注 A
 * Created by lzw on 14-9-29.
 */
var mutil = require('./mutil');
var mlog = require('./mlog');
var AV = require('leanengine');

function unfollow(user, targetUser) {
  return user.unfollow(targetUser.id);
}

function afterDeleteFollowee(req) {
  var user = req.object.get('user');
  var followee = req.object.get('followee');
  if(user && followee && user.id == req.user.id){
    /*这里加个判断，否则会执行两次。因为第一个unfollow时，调用了此函数，此函数又调用了unfollow
 ，第二次引发afterDelete*/
    unfollow(followee, user).then(function () {
      console.log('unfollow succeed followee='+followee.id+' user='+user.id);
    }, mlog.cloudErrorFn(res));
  } else {
    // skip
  }
}

function unfollowTest(req, res) {
  unfollow(AV.Object.createWithoutData('_User', "5416d9b2e4b0f645f29ddbfd"),
    AV.Object.createWithoutData('_User', "54bc8c2de4b0644caaed25e3")).then(function () {
      res.success('ok');
    }, mlog.cloudErrorFn)
}

exports.afterDeleteFollowee=afterDeleteFollowee;
exports.unfollow=unfollow;
exports.unfollowTest=unfollowTest;
