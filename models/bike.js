'use strict';

const mongoose = require('mongoose');
const mongooseApiQuery = require('mongoose-api-query');
const createdModified = require('mongoose-createdmodified').createdModifiedPlugin;

const BikeSchema = new mongoose.Schema({
   title: String,
   frame: String,
   fork: String,
   cranks: String,
   pedals: String,
   drivetrain: String,
   handlebars: String,
   saddle: String,
   frontWheel: String,
   rearWheel: String,
   images: [{
      name: String,
      url: String
   }],
   instagram: String
}, { minimize: false });


BikeSchema.plugin(mongooseApiQuery);
BikeSchema.plugin(createdModified, { index: true });

const Bike = mongoose.model('Bike', BikeSchema);
module.exports = Bike;
