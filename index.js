'use strict';

const config = require('./config');
const restify = require('restify');
const restifyPlugins = require('restify-plugins');
const corsMiddleware = require('restify-cors-middleware');
const winston = require('winston');
const bunyanWinston = require('bunyan-winston-adapter');
const mongoose = require('mongoose');

global.log = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: 'info',
            timestamp: function () {
                return new Date().toString()
            },
            json: true
        }),
    ]
});

global.Buffer = global.Buffer || require('buffer').Buffer;

if (typeof btoa === 'undefined') {
    global.btoa = function (str) {
        return new Buffer(str).toString('base64');
    };
}

if (typeof atob === 'undefined') {
    global.atob = function (b64Encoded) {
        return new Buffer(b64Encoded, 'base64').toString();
    };
}

global.server = restify.createServer({
    name: config.name,
    version: config.version,
    log: bunyanWinston.createAdapter(log)
});

server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());
const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ['x-fista-authenticate'],
    exposeHeaders: ['API-Token-Expiry']
});

server.pre(cors.preflight);
server.use(cors.actual);

server.on('uncaughtException', function (req, res, route, err) {
    log.error(err.stack);
    res.send(err);
});

server.listen(config.port, function () {
    mongoose.connection.on('error', function (err) {
        log.error('Mongoose default connection error: ' + err);
        process.exit(1);
    });

    mongoose.connection.on('open', function (err) {
        if (err) {
            log.error('Mongoose default connection error: ' + err);
            process.exit(1);
        }

        log.info(
            '%s v%s ready to accept connections on port %s in %s environment.',
            server.name,
            config.version,
            config.port,
            config.env
        );

        require('./routes/bikes');
        require('./routes/user');
        require('./routes/data');

    });

    global.db = mongoose.connect(config.db.uri)
});
