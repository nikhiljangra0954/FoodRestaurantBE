// here we will create  our user model

const mongoose = require("mongoose");

const addressschema =  mongoose.Schema({
  street: String,
  city: String,
  state: String,
  country: String,
  zip: String,
});

//now user schema

const userschema =  mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: addressschema,
});


const userModel = mongoose.model("user",userschema)

module.exports ={
    userModel
}