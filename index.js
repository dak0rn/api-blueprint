/**
 * Server root
 *
 * Collects all routes and starts the server
 */
require('./evilGlobalVariables');

const glob = require('glob-promise');
const express = require('express');
const { partial } = require('lodash');
const bodyParser = require('body-parser');

const server = express();

/* Setup the application server */
server.use(bodyParser.json());

/* Building blocks */
const findRoutes = partial(glob, './src/routes/**/*.js');
const findMiddlewares = partial(glob, './src/middlewares/**/*.js');
const requireAndIntegrate = function(files, app) {
    files.forEach(file => {
        const fn = require(file);

        if ('function' === typeof fn) fn(app);
    });
};

/* Start ✨ */
findMiddlewares()
    .then(middlewares => {
        requireAndIntegrate(middlewares, server);
        return findRoutes();
    })
    .then(routes => {
        requireAndIntegrate(routes, server);
    })
    .then(function() {
        server.listen(3000);
    })
    .catch(reason => {
        console.error('Failed to start the server', reason);
    });
