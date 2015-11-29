'use strict';

const config = require('../config');
const Promise = require('bluebird');
const fs = require('fs-extra');
const storage = require('../storage');
const errors = require('../errors');
const utils = require('./utils');
const genQiniuToken = require('../utils/gen-qiniu-token');

/**
 * ## Upload API Methods
 *
 * **See:** [API Methods](index.js.html#api%20methods)
 */
module.exports = {

  /**
   * ### Add Image
   *
   * @public
   * @param {{context}} options
   * @returns {Promise} Success
   */
  add: function(options) {
    var store = storage.getStorage(),
      filepath;

    // Check if a file was provided
    if (!utils.checkFileExists(options, 'uploadimage')) {
      return Promise.reject(new errors.NoPermissionError('请选择一张图片。'));
    }

    // Check if the file is valid
    if (!utils.checkFileIsValid(options.uploadimage, config.uploads.contentTypes, config.uploads.extensions)) {
      return Promise.reject(new errors.UnsupportedMediaTypeError('只能上传图片！'));
    }

    filepath = options.uploadimage.path;

    return store.save(options.uploadimage)
      .then(function(url) {
        return url;
      })
      .finally(function() {
        // Remove uploaded file from tmp location
        return Promise.promisify(fs.unlink)(filepath);
      });
  },
  uploadToken: function() {
    return Promise.resolve({
      code: 0,
      data: genQiniuToken()
    });
  }
};

