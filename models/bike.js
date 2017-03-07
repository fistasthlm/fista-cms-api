'use strict';

var mongoose = require('mongoose'),
   mongooseApiQuery = require('mongoose-api-query'),
   createdModified = require('mongoose-createdmodified').createdModifiedPlugin;

var BikeSchema = new mongoose.Schema({
   title: String,
}, { minimize: false });


BikeSchema.plugin(mongooseApiQuery);
BikeSchema.plugin(createdModified, { index: true });

var Bike = mongoose.model('Bike', BikeSchema);
module.exports = Bike;
