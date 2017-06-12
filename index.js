/**
 * Server root
 *
 * Collects all routes and starts the server
 */
const glob = require('glob-promise');
const express = require('express');
const { partial } = require('lodash');
const bodyParser = require('body-parser');

const server = express();

/* Setup the application server */
server.use(bodyParser.json());

/* Building blocks */
const findRoutes = partial(glob, './routes/**/*.js');
const findMiddlewares = partial(glob, './middlewares/**/*.js');
const requireAndIntegrate = function(files, app) {
    files.forEach(file => {
        const fn = require(file);

        if ('function' === typeof fn) fn(app);
    });
};

/* Start ✨ */
findRoutes()
    .then(routes => {
        requireAndIntegrate(routes, server);
        return findMiddlewares();
    })
    .then(middlewares => {
        requireAndIntegrate(middlewares);
    })
    .then(function() {
        server.listen(3000);
    });
