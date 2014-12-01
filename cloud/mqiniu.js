/**
 * Created by lzw on 14/12/2.
 */
var qiniu = require('qiniu');

function uptoken(bucketname) {
  var putPolicy = new qiniu.rs.PutPolicy(bucketname);
  //putPolicy.callbackUrl = callbackUrl;
  //putPolicy.callbackBody = callbackBody;
  //putPolicy.returnUrl = returnUrl;
  //putPolicy.returnBody = returnBody;
  //putpolicy.persistentOps = persistentops;
  //putPolicy.persistentNotifyUrl = persistentNotifyUrl;
  //putPolicy.expires = expires;

  return putPolicy.token();
}

function qiniuUptoken(req, res) {
  res.success(uptoken('lzw-picture'));
}

exports.uptoken = uptoken;
exports.qiniuUptoken = qiniuUptoken;
