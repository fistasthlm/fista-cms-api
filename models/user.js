'use strict';

const mongoose = require('mongoose');
const mongooseApiQuery = require('mongoose-api-query');
const createdModified = require('mongoose-createdmodified').createdModifiedPlugin;

const UserSchema = new mongoose.Schema({
   username: String,
   password: String,
   instagram: String
}, {minimize: false});

UserSchema.plugin(mongooseApiQuery);
UserSchema.plugin(createdModified, {index: true});

const User = mongoose.model('User', UserSchema);
module.exports = User;
