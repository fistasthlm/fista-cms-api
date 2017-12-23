'use strict';

var errors = require('restify-errors');
var Bike = require('../models/bike');
var User = require('../models/user');

server.get('/bikes/', function (req, res, next) {
    Bike.apiQuery(req.params, function (error, docs) {
        if (error) {
            console.error(error);
            return next(new errors.InvalidContentError(error.errors.name.message));
        }

        res.send(docs);
        next();
    })
});

server.get('/bikes/:handle', function (req, res, next) {
    Bike.apiQuery({instagram: req.params.handle}, function (err, docs) {

        if (err) {
            log.error(err);
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(docs);
        next();
    })

});

server.get('/bike/:bike_id', function (req, res, next) {
    Bike.findOne({_id: req.params.bike_id}, function (error, document) {
        if (error) {
            log.error(error);
            return next(new errors.InvalidContentError(error.errors.name.message));
        }

        res.send(document);
        next();
    })
});

server.post('/bike', function (req, res, next) {
    var data = req.body || {};
    var bike = new Bike(data);
    bike.save(function (err) {

        if (err) {
            log.error(err);
            return next(new errors.InternalError(err.message));
        }

        res.send(201);
        next();
    })
});

server.put('/bike/:bike_id', function (req, res, next) {
    var data = req.body || {};

    Bike.findOne({_id: req.params.bike_id}, function (error, doc) {
        if (error) {
            log.error(error);
            return next(new errors.InvalidContentError(err.errors.name.message));
        }
        else if (!doc) {
            return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'));
        }

        Bike.update({_id: req.params.bike_id}, data, function (error) {
            if (error) {
                log.error(error);
                return next(new errors.InvalidContentError(error.errors.name.message))
            }

            res.send(200, data);
            next();
        })
    })
});

server.del('/bike/delete/:bike_id', function (req, res, next) {
    var token = req.headers['x-fista-authenticate'] || {};
    if (!token) {
        res.send(400);
    }

    var credentials = global.atob(token).split(':');
    User.findOne({ username: credentials[0] }, function (userError, user) {
        if (userError) {
            log.error(userError);
            return next(new errors.InvalidContentError(userError.errors.name.message));
        } else if(!user) {
            return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'))
        } else {
            Bike.findOne({_id: req.params.bike_id}, function (bikeError, bike) {
                if (bikeError) {
                    log.error(bikeError);
                    return next(new errors.InvalidContentError(bikeError.errors.name.message));
                }

                if (bike && (user.instagram === bike.info.instagram || user.instagram.bike.info.instagram)) {
                    bike.remove();
                    res.send(204);
                    next();
                }
            })
        }
    });
});
