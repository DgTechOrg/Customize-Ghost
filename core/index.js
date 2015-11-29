'use strict';
// ## Server Loader
// Passes options through the boot process to get a server instance back
// Set the default environment to be `development`
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const server = require('./server');

function makeGhost(options) {
    options = options || {};

    return server(options);
}

module.exports = makeGhost;
