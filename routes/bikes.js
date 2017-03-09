'use strict';

var errors = require('restify-errors');
var Bike = require('../models/bike');

server.get('/bike', function(req, res, next) {
   Bike.apiQuery(req.params, function(err, docs) {

      if (err) {
         log.error(err);
         return next(new errors.InvalidContentError(err.errors.name.message))
      }

      res.send(docs);
      next()
   })

});

server.get('/bike:bike_id', function (req, res, next) {
   Bike.findOne({ _id: req.params.bike_id }, function (error, document) {
      if (error) {
         log.error(error);
         return next(new errors.InvalidContentError(error.errors.name.message));
      }

      res.send(document);
      next();
   })
});

server.post('/bike', function(req, res, next) {
   var data = req.body || {};

   var todo = new Bike(data);
   todo.save(function(err) {

      if (err) {
         log.error(err);
         return next(new errors.InternalError(err.message));
         next();
      }

      res.send(201);
      next();
   })
});
