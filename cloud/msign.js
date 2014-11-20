/**
 * Created by lzw on 14/11/20.
 */
var common = require('cloud/common.js');

APPID = AV.applicationId;
MASTER_KEY = AV.masterKey;

function _sign(peer_id,watch_ids,super_peer){
  watch_ids.sort();
  var ts = parseInt(new Date().getTime() / 1000);
  var nonce = common.getNonce(5);
  var msg = [APPID, peer_id, watch_ids.join(':'), ts, nonce].join(':');
  if (super_peer) {
    msg = msg + ':sp';
  }
  sig = common.sign(msg, MASTER_KEY);

  // 回复：其中 nonce, timestamp, signature, watch_ids 是必要字段，需
  // 要客户端返回给实时通信服务
  return {"nonce": nonce, "timestamp": ts, "signature": sig, "watch_ids": watch_ids,
    "sp": super_peer, "msg": msg};
}

function sign(request, response) {
  var peer_id = request.params['self_id'];  // 当前用户的peer id
  var watch_ids = request.params['watch_ids'] || [];
  // 是否是 Super peer
  var super_peer = request.params['sp'];
  // 实际使用中，你可能还需要传额外的参数，帮助你验证用户的身份，在这
  // 个例子里我们放行所有，仅演示签名

  var result=_sign(peer_id,watch_ids,super_peer);
  response.success(result);
}

function _groupSign(peer_id,group_id,group_peer_ids,action){
  group_peer_ids.sort();
  var ts = parseInt(new Date().getTime() / 1000);
  var nonce = common.getNonce(5);
  msg = [APPID, peer_id, group_id, group_peer_ids.join(':'), ts, nonce, action].join(':');
  sig = common.sign(msg, MASTER_KEY);

  // 返回结果，同上，需要的主要是 nonce, timestamp, signature,
  // group_peer_ids 这几个字段
  return {"nonce": nonce, "timestamp": ts, "signature": sig,
    "group_peer_ids": group_peer_ids, "group_id": group_id,
    "action": action, "msg": msg};
}

function groupSign(request, response) {
  var peer_id = request.params['self_id'];
  var group_id = request.params['group_id'];
  var group_peer_ids = request.params['group_peer_ids'] || [];
  // 组操作的行为，值包含 'join', 'invite', 'kick'
  var action = request.params['action'];
  var result=_groupSign(peer_id,group_id,group_peer_ids,action);
  response.success(result);
}

exports._sign=_sign;
exports._groupSign=_groupSign;
exports.sign=sign;
exports.groupSign=groupSign;
