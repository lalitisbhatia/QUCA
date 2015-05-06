'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagTypeSchema = new Schema({
    tagTypeId: Number,
    tagTypeName: String,
    tags:[TagSchema]
  }
);

var TagSchema = new Schema({
    tagId: Number,
    tagName: String
  }
);

exports.TagSchema = TagSchema;
module.export = mongoose.model('Tag',TagSchema);