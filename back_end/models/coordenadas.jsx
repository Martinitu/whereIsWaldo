const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Coordinates = new Schema({

    name: { type: String, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    
    
});

  // Export model
  module.exports = mongoose.model("Coordinates", Coordinates);