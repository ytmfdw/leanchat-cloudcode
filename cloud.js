var AV = require('leanengine');

var msign = require('./custom/msign');
var mchat = require('./custom/mchat');
var muser = require('./custom/muser');
var mutil = require('./custom/mutil');

AV.Cloud.define("conv_sign", msign.convSign);

AV.Cloud.define("_messageReceived",mchat.messageReceived);
AV.Cloud.define("_receiversOffline", mchat.receiversOffline);
AV.Cloud.define("_conversationAdd",mchat.conversationAdd);
AV.Cloud.define("_conversationRemove",mchat.conversationRemove);
AV.Cloud.define("_conversationStart",mchat.conversationStart);

AV.Cloud.afterDelete('_Followee',muser.afterDeleteFollowee);

if(mutil.isDevelopment()){
  AV.Cloud.define("test",muser.unfollowTest);
}

module.exports = AV.Cloud;
