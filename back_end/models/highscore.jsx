const mongoose = require('mongoose');
const Schema = mongoose.Schema

const HighScoreList = new Schema({

    name: { type: String, required: true },
    time: { type : Number, require: true  }
    
});

  // Export model
  module.exports = mongoose.model("HighScoreList", HighScoreList);