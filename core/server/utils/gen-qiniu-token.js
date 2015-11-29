'use strict';

const crypto = require('crypto');
const config = require('../config').storage;
const deadline = 60 * 60 * 24;  // one day
function getFlags() {
  //对这个方法只做简单上传到bucket就好
  var returnObj = {
    scope: config.bucketname,
    deadline: deadline + Math.floor(Date.now() / 1000)
  }
  return returnObj;
}

function urlsafeBase64Encode (jsonFlags) {
  var encoded = new Buffer(jsonFlags).toString('base64');
  return base64ToUrlSafe(encoded);
}

function base64ToUrlSafe (val) {
  return val.replace(/\//g, '_').replace(/\+/g, '-');
}

function hmacSha1 (encodedFlags, secretKey) {
  var hmac = crypto.createHmac('sha1', secretKey);
  return hmac.update(encodedFlags).digest('base64');
}

module.exports = function() {
  var flags = getFlags();
  var encodedFlags = urlsafeBase64Encode(JSON.stringify(flags));
  var encoded = hmacSha1(encodedFlags, config.SECRET_KEY);
  var encodedSign = base64ToUrlSafe(encoded);
  var tokenInfo = config.ACCESS_KEY + ':' + encodedSign + ':' + encodedFlags;
  return tokenInfo;
}
