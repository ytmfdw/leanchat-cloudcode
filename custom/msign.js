/**
 * Created by lzw on 14/11/20.
 */
var AV = require('leanengine');
var crypto = require('crypto');

APPID = AV.applicationId;
MASTER_KEY = AV.masterKey;

function sign(text, key) {
  // Hmac-sha1 hex digest
  return crypto.createHmac('sha1', key).update(text).digest('hex');
}

function getNonce(chars){
  var d = [];
  for (var i=0; i<chars; i++) {
    d.push(parseInt(Math.random()*10));
  }
  return d.join('');
}

function _convSign(selfId, convid, targetIds, action, appId, masterKey, nonce,ts) {
  if (targetIds == null) {
    targetIds = [];
  }
  targetIds.sort();
  if (!appId) {
    appId = APPID;
  }
  if (!masterKey) {
    masterKey = MASTER_KEY;
  }
  if (!ts){
    ts = parseInt(new Date().getTime() / 1000);
  }
  if (!nonce) {
    nonce = getNonce(5);
  }
  var content;
  if (convid) {
    content = [appId, selfId, convid, targetIds.join(':'), ts, nonce].join(':');
  } else {
    content = [appId, selfId, targetIds.join(':'), ts, nonce].join(':');
  }

  if (action) {
    content += ':' + action;
  }
  var sig = sign(content, masterKey);
  return {"nonce": nonce, "timestamp": ts, "signature": sig};
}

function convSign(request, response) {
  var selfId = request.params['self_id'];
  var convid = request.params['convid'];
  var targetIds = request.params['targetIds'];
  var action = request.params['action'];
  var result = _convSign(selfId, convid, targetIds, action);
  response.success(result);
}

module.exports = {
  _convSign: _convSign,
  convSign: convSign
};