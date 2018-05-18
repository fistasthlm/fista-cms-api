'use strict';

const errors = require('restify-errors');
const Bike = require('../models/bike');

server.get('/bikes', function (req, res, next) {
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
    Bike.apiQuery({ instagram: req.params.handle }, function (err, docs) {

        if (err) {
            log.error(err);
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(docs);
        next();
    })

});

server.get('/bike/:bike_id', function (req, res, next) {
    Bike.findOne({ _id: req.params.bike_id }, function (error, document) {
        if (error) {
            log.error(error);
            return next(new errors.InvalidContentError(error.errors.name.message));
        }

        res.send(document);
        next();
    })
});

server.post('/bike', function (req, res, next) {
    const data = req.body || {};
    const bike = new Bike(data);
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
    const data = req.body || {};

    Bike.findOne({ _id: req.params.bike_id }, function (error, doc) {
        if (error) {
            log.error(error);
            return next(new errors.InvalidContentError(err.errors.name.message));
        }
        else if (!doc) {
            return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'));
        }

        Bike.update({ _id: req.params.bike_id }, data, function (error) {
            if (error) {
                log.error(error);
                return next(new errors.InvalidContentError(error.errors.name.message))
            }

            res.send(200, data);
            next();
        })
    })
});
