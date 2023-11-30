require("dotenv").config();
let mongoose = require("mongoose");
let express = require("express");
// let PersonSchema = require("./models/Person");
const { urlencoded } = require("body-parser");

let app = express();
app.use(express({ urlencoded: true }));
app.use(express.json());

/**
 * models
 */
let personSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: Number,
  favoriteFoods: [String],
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log(`coudnt connect to database: ${error}`);
  });

let Person;
Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let document = Person({
    name: "ayo",
    age: 20,
    favoriteFoods: ["eba", "rice", "meat"],
  });
  document.save(function (err, data) {
    if (err) {
      console.log(`failed to save user ${err}`);
    } else done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  let document = Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      console.error(` failed to create multiple data : ${err}`);
      done(err);
    } else {
      done(null, data);
      console.log("multiple data created successfully");
    }
  });
};

const findPeopleByName = (personName, done) => {
  let data = Person.findOne({ name: personName }, (err, data) => {
    if (err) {
      console.error(err);
      done(err);
    } else if (!data) {
      console.log("user not found");
    } else done(null, data);
  });
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
