'use strict';
var AV = require('leanengine');

var APP_ID = glqgrTPFFAbDv3jHmjhXBNzF-gzGzoHsz;
var APP_KEY = UISpc3O6Ac5o33eVKNzCnh5o;
var MASTER_KEY = 4mdumPYgaP0MWHPENrdJmBxs;

AV.initialize(APP_ID, APP_KEY, MASTER_KEY);
// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();

var app = require('./app');

// 端口一定要从环境变量 `LC_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
var PORT = parseInt(process.env.LC_APP_PORT || 3000);
app.listen(PORT, function () {
  console.log('Node app is running, port:', PORT);
});
