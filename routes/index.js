'use strict';

/**
 * Module Dependencies
 */
const errors = require('restify-errors');
const Bike = require('../models/bike');

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

server.post('/bike', function(req, res, next) {

   let data = req.body || {};

   let todo = new Bike(data);
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
