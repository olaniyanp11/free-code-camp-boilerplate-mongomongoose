let mongoose = require("mongoose");

let personSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: Number,
  favoriteFoods: String,
});
let Person = mongoose.model("Person", personSchema);
module.exports = Person;
