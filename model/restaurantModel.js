// here we will create model and schema for the restaurant

const mongoose = require("mongoose");

// {
//     _id: ObjectId,
//     name: String,
//     address: {
//       street: String,
//       city: String,
//       state: String,
//       country: String,
//       zip: String
//     },
//     menu: [{
//       _id: ObjectId,
//       name: String,
//       description: String,
//       price: Number,
//       image: String
//     }]
//   }

// restaurant address schema

const addressschema = mongoose.Schema({
  street: String,
  city: String,
  state: String,
  country: String,
  zip: String,
});

// restaurant schema

const restaurantschema = mongoose.Schema({
  name: String,
  address: addressschema,
  menu: [
    {
      name: String,
      description: String,
      price: Number,
      image: String,
    },
  ],
});

const restaurantModel = mongoose.model("restaurant", restaurantschema);

module.exports = {
  restaurantModel,
};
