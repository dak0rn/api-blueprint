/**
 * Root route
 */
const pkg = require('../../package.json');

const getRoot = function(req, res) {
    res.json({
        version: pkg.version
    });
};

module.exports = function(server) {
    server.get('/', getRoot);
};
