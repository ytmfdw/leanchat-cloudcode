require("cloud/app.js");

var msign = require('cloud/msign.js');
var mchat = require('cloud/mchat');

AV.Cloud.define("conv_sign", msign.convSign);

AV.Cloud.define("_messageReceived",mchat.messageReceived);
AV.Cloud.define("_receiversOffline", mchat.receiversOffline);
AV.Cloud.define("_conversationAdd",mchat.conversationAdd);
AV.Cloud.define("_conversationRemove",mchat.conversationRemove);
AV.Cloud.define("_conversationStart",mchat.conversationStart);
