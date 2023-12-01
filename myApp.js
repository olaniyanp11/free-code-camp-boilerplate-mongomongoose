require("dotenv").config();
let mongoose = require("mongoose");
let express = require("express");
let personSchema = require("./models/Person");
const { urlencoded } = require("body-parser");
let dataarray = require("./data");
const { find } = require("./models/Person");
// const { log } = require("fcc-express-bground");

let app = express();
app.use(express({ urlencoded: true }));
app.use(express.json());

/**
 * models
 */

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
  let data = Person.find({ name: personName }, (err, data) => {
    if (err) {
      console.error(err);
      done(err);
    } else if (!data) {
      console.log("user not found");
    } else done(null, data);
  });
};

const findOneByFood = (food, done) => {
  let data = Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      console.error(err);
      done(err);
    } else if (!data) {
      console.log("user with food not found");
    } else done(null, data);
  });
};

const findPersonById = (personId, done) => {
  let data = Person.findOne({ _id: personId }, (err, data) => {
    if (err) {
      console.error(err);
      done(err);
    } else if (!data) {
      console.log("user with id not found");
    } else done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  let user = Person.findOne({ _id: personId }, (err, data) => {
    if (err) {
      console.error(err);
      done(err);
    } else if (!data) {
      console.log("user with the id not found");
    } else {
      data.favoriteFoods.push(foodToAdd);
      data.save((err, person) => {
        if (err) {
          console.error(err);
        } else {
          console.log("user food updated");
          done(null, person);
        }
      });
    }
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    (err, data) => {
      if (err) {
        console.error(err);
        done(err);
      } else if (!data) {
        console.log("user with name not found");
      } else done(null, data);
    }
  );
};

const removeById = (personId, done) => {
  Person.findOneAndDelete({ _id: personId }, (err, data) => {
    if (err) console.error(err);
    else if (!data) console.error("person with id not found");
    else {
      console.log("user deleted");
      done(null, data);
    }
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, valid) => {
    if (err) {
      console.error(err);
      done(err);
    } else {
      done(null, valid);
    }
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find(
    { favoriteFoods: foodToSearch }
      .sort("name")
      .limit(2)
      .select("-age")
      .exec((err, data) => {
        if (err) {
          done(err);
          console.error(err);
        } else {
          console.log(data);
          done(null, data);
        }
      })
  );
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
