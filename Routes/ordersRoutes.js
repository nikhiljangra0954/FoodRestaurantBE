// here we will create new Route for the Orders

const express = require("express");
const { orderModel } = require("../model/ordersModel");

const orderRoute = express.Router();

// get all orders from teh database

orderRoute.get("/orders/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const orders = await orderModel.findById({ _id: id });
    if (!orders) {
      res.send("No Order found!");
    } else {
      res.status(200).send(orders);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message });
  }
});

// Post a order on the database

orderRoute.post("/orders", async (req, res) => {
  // get all the data from the body
  const {
    user,
    restaurant,
    name,
    price,
    quantity,
    street,
    city,
    state,
    country,
    zip,
    status,
  } = req.body;

  try {
    const neworder = await new orderModel({
        user,
        restaurant,
        items :[{
            name,
            price,
            quantity
        }],
        totalPrice : price*quantity,
        deliveryAddress:{
            street,
            city,
            state,
            country,
            zip
        },
        status
    })
    await neworder.save()
    res.status(200).send("New Order created successfully")
  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: error.message });
  }



});

module.exports = {
  orderRoute,
};
