'use strict';

var errors = require('restify-errors');
var User = require('../models/user');

server.post('/login', function (req, res, next) {
   var data = req.body || {};

   User.findOne({ username: data.username }, function (error, document) {
      if (error) {
         log.error(error);
         return next(new errors.InvalidContentError(error.errors.name.message));
      } else if(!document) {
         return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'))
      } else if(document.password === data.password) {
         res.send(200);
      }
   })
});

server.post('/createUser', function (req, res, next) {
   var data = req.body || {};

   var user = new User(data);
   user.save(function (error) {
      if (error) {
         log.error(error);
         return next(new errors.InternalError(error.message));
         next();
      }

      res.send(201);
      next();
   })
})
