const mongoose = require("mongoose");

// {
//     _id: ObjectId,
//     user : { type: ObjectId, ref: 'User' },
//     restaurant : { type: ObjectId, ref: 'Restaurant' },
//   items: [{
//     name: String,
//     price: Number,
//     quantity: Number
//   }],
//   totalPrice: Number,
//   deliveryAddress: {
//     street: String,
//     city: String,
//     state: String,
//     country: String,
//     zip: String
//   },
//   status: String // e.g, "placed", "preparing", "on the way", "delivered"
// }

const address = mongoose.Schema({
  street: String,
  city: String,
  state: String,
  country: String,
  zip: String,
});

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "restaurants" },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalPrice: Number,
  deliveryAddress: address,
  status: String,
});

const orderModel = mongoose.model("orders", orderSchema);

module.exports = {
  orderModel,
};
