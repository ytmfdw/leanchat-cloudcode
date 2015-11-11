/**
 * Created by lzw on 14-8-8.
 */
var util = require('util');

function isDevelopment() {
  return !process.env.LC_APP_ENV || process.env.LC_APP_ENV == 'development';
}

var open = isDevelopment();

function startWith(s, prefix, f) {
  if (s.indexOf(prefix) == 0) {
    f.call();
  }
}

function filterFn(s, f) {
  startWith(s, '', f);
}

function logError(error) {
  error = util.inspect(error);
  console.log(error + '');
}

function log(s,mustLog) {
  s = s + '';
  if (open || mustLog===true) {
    filterFn(s, function () {
      console.log(s);
    });
  }
}

function dir(o) {
  if(open){
    console.dir(o);
  }
}

function printProperties(a,mustLog) {
  for (var p in a) {
    log(p + ' = ' + a[p],mustLog);
  }
}

function logObject(object,mustLog){
  var s=JSON.stringify(object);
  log(s,mustLog);
}

exports.log = log;
exports.logError = logError;
exports.printProperties = printProperties;
exports.logObject=logObject;
exports.dir=dir;
