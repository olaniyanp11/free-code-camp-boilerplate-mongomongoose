let mongoose = require("mongoose");

let personSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: Number,
  favoriteFoods: [String],
});

module.exports = personSchema;
