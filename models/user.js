'use strict';

var mongoose = require('mongoose');
var mongooseApiQuery = require('mongoose-api-query');
var createdModified = require('mongoose-createdmodified').createdModifiedPlugin;

var UserSchema = new mongoose.Schema({
   username: String,
   password: String,
   instagram: String
}, {minimize: false});

UserSchema.plugin(mongooseApiQuery);
UserSchema.plugin(createdModified, {index: true});

var User = mongoose.model('User', UserSchema);
module.exports = User;
