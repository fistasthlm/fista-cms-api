'use strict';

var mongoose = require('mongoose');
var mongooseApiQuery = require('mongoose-api-query');
var createdModified = require('mongoose-createdmodified').createdModifiedPlugin;

var BikeSchema = new mongoose.Schema({
    info: {
        title: String,
        instagram: String
    },
    specifications: {
        frame: String,
        fork: String,
        cranks: String,
        pedals: String,
        drivetrain: String,
        handlebars: String,
        saddle: String,
        frontWheel: String,
        rearWheel: String
    },
    images: [{
        name: String,
        url: String
    }]
}, {minimize: false});


BikeSchema.plugin(mongooseApiQuery);
BikeSchema.plugin(createdModified, {index: true});

var Bike = mongoose.model('Bike', BikeSchema);
module.exports = Bike;
