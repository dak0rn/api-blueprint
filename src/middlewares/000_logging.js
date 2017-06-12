/**
 * Logging middleware
 */
const { info } = require('../services/log');

const loggingMiddleware = function(req, res, next) {
    const { method, path } = req;
    const now = Date.now();

    next();

    const duration = Date.now() - now;

    info('%s %s took %s ms', method, path, duration);
};

module.exports = function(server) {
    server.use(loggingMiddleware);
};
