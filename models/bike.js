'use strict';

const mongoose = require('mongoose'),
   mongooseApiQuery = require('mongoose-api-query'),
   createdModified = require('mongoose-createdmodified').createdModifiedPlugin;

const BikeSchema = new mongoose.Schema({
   title: String,
}, { minimize: false });


BikeSchema.plugin(mongooseApiQuery);
BikeSchema.plugin(createdModified, { index: true });

const Bike = mongoose.model('Bike', BikeSchema);
module.exports = Bike;
