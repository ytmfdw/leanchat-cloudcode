var util = require('util');
var mlog = require('./mlog');
var crypto = require('crypto');

function doErr(err) {
  console.log(err);
}

function renderError(res, error) {
  var _error;
  if (error == null) {
    _error = "Unknown error";
  }
  if (typeof error != 'string') {
    _error = util.inspect(error);
    if (error.stack && process.env.LC_APP_ENV == 'development') {
      _error += ' stack=' + error.stack;
    }
  }
  res.render('500', {error: _error});
}

function renderErrorFn(res) {
  return function (err) {
    renderError(res, err);
  };
}

function rejectFn(promise) {
  return function (error) {
    promise.reject(error);
  }
}

function renderForbidden(res) {
  renderError(res, "Forbidden area.");
}

function findOne(clzName, modifyQueryFn) {
  var Clz = new AV.Object.extend(clzName);
  var q = new AV.Query(Clz);
  if (modifyQueryFn) {
    modifyQueryFn(q);
  }
  return q.first();
}

function findAll(clzName, modifyQueryFn) {
  var q = new AV.Query(clzName);
  var res = [];
  var p = new AV.Promise();
  if (modifyQueryFn) {
    modifyQueryFn(q);
  }
  q.count({
      success: function (cnt) {
        var t = (cnt + 999) / 1000;  //I'm so clever!
        t = Math.floor(t);  //But...
        var promises = [];
        for (var i = 0; i < t; i++) {
          var skip = i * 1000;
          var q = new AV.Query(clzName);
          q.ascending('createdAt');
          q.limit(1000);
          if (modifyQueryFn) {
            modifyQueryFn(q);
          }
          q.skip(skip);
          promises.push(q.find({
            success: function (lines) {
              res = res.concat(lines);
              return AV.Promise.as(res);
            }
          }));
        }
        AV.Promise.when(promises).then(function () {
          p.resolve(res);
        }, rejectFn(p));
      },
      error: rejectFn(p)
    }
  );
  return p;
}

function testFn(fn, res) {
  fn.call(this).then(function () {
    res.send('ok');
  }, mutil.renderErrorFn(res));
}

function encrypt(s) {
  var md5 = crypto.createHash('md5');
  md5.update(s);
  return md5.digest('hex');
}

function cloudErrorFn(response) {
  return function (error) {
    console.log('cloudError ' + error.message);
    response.error(error.message);
  };
}

function isDevelopment() {
  return !process.env.LC_APP_ENV || process.env.LC_APP_ENV == 'development';
}

exports.doErr = doErr;
exports.renderErrorFn = renderErrorFn;
exports.renderError = renderError;
exports.rejectFn = rejectFn;
exports.renderForbidden = renderForbidden;
exports.findAll = findAll;
exports.findOne = findOne;
exports.testFn = testFn;
exports.encrypt = encrypt;
exports.cloudErrorFn = cloudErrorFn;
exports.isDevelopment = isDevelopment;
