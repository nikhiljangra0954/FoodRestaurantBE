// here we will create all UserRoutes

const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { userModel } = require("../model/userModel");
const userRouter = express.Router();

// Register Route for the User

userRouter.post("/register", async (req, res) => {
  // get the data from the body

  const { name, email, password, street, city, state, country, zip } = req.body;
  // console.log(name)
  if (
    !name ||
    !email ||
    !password ||
    !street ||
    !city ||
    !state ||
    !country ||
    !zip
  ) {
    res.send("Please Fill all the details");
  } else {
    try {
      // check the uer in database by email
      const user = await userModel.findOne({ email });
      if (user) {
        res.send("User is already registered Please Login");
      } else {
        // change the password and send the data to database
        bcrypt.hash(password, 3, async function (err, hash_pass) {
          // Store hash in your password DB.
          if (err) {
            console.log(err);
          } else {
            const newUser = new userModel({
              name,
              email,
              password: hash_pass,
              address: { street, city, state, country, zip },
            });
            await newUser.save();
            res.status(200).send("New User Created Successfully");
          }
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: error.message });
    }
  }
});

// User Login Route ::

userRouter.post("/login", async (req, res) => {
  // get email and password from the user
  const { email, password } = req.body;
  if (!email || !password) {
    res.send("Please fill all the details");
  }
  try {
    const user = await userModel.findOne({ email });
    // console.log(user)
    let hashpassword = user.password;
    if (!user) {
      res.send("User is not registered please register First");
    }
    // compare the password
    else {
      bcrypt.compare(password, hashpassword, async function (err, result) {
        // result == true
        if (err) {
          res.send("Password in Wrong");
        }
        if (result) {
          // if password is correct create a token with user id
          const token = jwt.sign({ id: user._id }, "nikhil");
          res.status(200).send({ msg: "Login successfull", token: token });
        } else {
          res.send("somthing went wrong");
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message });
  }
});

// Reset password Route for the User

userRouter.patch("/user/:id/reset", async (req, res) => {
  const id = req.params.id;
  const { password } = req.body;
  // got the userid and password
  try {
    const user = await userModel.findById({ _id: id });
    if (user) {
      bcrypt.hash(password, 3, async function (err, hash_passs) {
        // Store hash in your password DB.
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          const updateduser = await userModel.findOneAndUpdate(
            { _id: id },
            { password: hash_passs }
          );
          // await updateduser.save()
          res.status(200).send("Password Updated successfully");
        }
      });
    } else {
      res.send("somthing wrong");
    }
    // now again change the password and hashit
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message });
  }
});

module.exports = {
  userRouter,
};
