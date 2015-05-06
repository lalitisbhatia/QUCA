'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExerciseTags = new Schema(
  {
    exerTagId: Number,
    exerTagName: String
  }
);

var ExerciseSchema = new Schema({
    exerciseId: Number,
    exerciseName: String,
    exerciseType: String,
    category: String,
    tags: [ExerciseTags]
  }
);

// create the model for Exercise and expose it to our app
module.exports = mongoose.model('Exercise',ExerciseSchema);