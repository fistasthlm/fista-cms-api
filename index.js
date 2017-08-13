'use strict';

var config = require('./config');
var restify = require('restify');
var corsMiddleware = require('restify-cors-middleware');
var winston = require('winston');
var bunyanWinston = require('bunyan-winston-adapter');
var mongoose = require('mongoose');

global.log = new winston.Logger({
   transports: [
      new winston.transports.Console({
         level: 'info',
         timestamp: function() {
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
   name    : config.name,
   version : config.version,
   log     : bunyanWinston.createAdapter(log),
});

server.use(restify.jsonBodyParser({ mapParams: true }));
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser({ mapParams: true }));
server.use(restify.fullResponse());
const cors = corsMiddleware({
   origins: ['*'],
   allowHeaders: ['API-Token'],
   exposeHeaders: ['API-Token-Expiry']
});

server.pre(cors.preflight);
server.use(cors.actual);

server.on('uncaughtException', function(req, res, route, err) {
   log.error(err.stack);
   res.send(err);
});

server.listen(config.port, function() {
   mongoose.connection.on('error', function(err) {
      log.error('Mongoose default connection error: ' + err);
      process.exit(1);
   });

   mongoose.connection.on('open', function(err) {
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

   });

   global.db = mongoose.connect(config.db.uri)

});
