// here we will create all Routes for the restaurant

const express = require("express");
const { restaurantModel } = require("../model/restaurantModel");
const restRoute = express.Router();

// All Restaurant from the database
restRoute.get("/restaurants", async (req, res) => {
  // res.send("restaurant Routes working")
  // get list of all the restaurants form the database
  try {
    const restaurants = await restaurantModel.find();
    res.status(200).send(restaurants);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message });
  }
});

// create a new restaurant

restRoute.post("/restaurant", async (req, res) => {
  // get data from the body
  const { name, street, city, state, country, zip, description, price, image } =
    req.body;

  if (
    !name ||
    !street ||
    !city ||
    !state ||
    !country ||
    !zip ||
    !description ||
    !price ||
    !image
  ) {
    res.send("fill all the details");
  }

  try {
    const restaurantname = await restaurantModel.findOne({ name });
    if (restaurantname) {
      res.send("this restaurant already exists");
    } else {
      const newrest = await restaurantModel({
        name,
        address: {
          street,
          city,
          state,
          country,
          zip,
        },
        menu: [
          {
            name,
            description,
            price,
            image,
          },
        ],
      });

      await newrest.save();
      res.status(200).send("New restaurant created successfully");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message });
  }
});

// Find the restaurant By its id from params

restRoute.get("/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // find the restaurant by id
    const restaurant = await restaurantModel.findById({ _id: id });
    if (!restaurant) {
      res.send("Not Found");
    } else {
      res.status(200).send(restaurant);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message });
  }
});

// get the menu of the sepecific Restaurant

restRoute.get("/restaurants/:id/menu", async (req, res) => {
  const id = req.params.id;
  try {
    const restaurant = await restaurantModel.findById({ _id: id });
    // find
    if (!restaurant) {
      res.send("Not Found");
    } else {
      const menu = restaurant.menu;
      res.status(200).send(menu);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message });
  }
});

// add the new items to the particular restaurant menu

restRoute.put("/restaurants/:id/menu", async (req, res) => {
  const id = req.params.id;
  const { name, description, price, image } = req.body;
  try {
    const restaurant = await restaurantModel.findById({ _id: id });
    let obj = {
      name,
      description,
      price,
      image,
    };
    restaurant.menu.push(obj);
    restaurant.save();
    res.send("Menu Updated");
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message });
  }
});

// Delete the Item from the Menu

restRoute.delete("/restaurants/:id1/menu/:id2", async (req, res) => {
  const resid = req.params.id1;
  const menuid = req.params.id2;
  try {
    const restaurant = await restaurantModel.findById({ _id: resid });

    for (let i = 0; i < restaurant.menu.length; i++) {
      if (restaurant.menu[i]._id == menuid) {
        restaurant.menu.splice(i, 1);
      }
    }
    await restaurant.save();
    res.send("Menu deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message });
  }
});

module.exports = {
  restRoute,
};
