// Food Delivery Backend Apis

// creata a basic api
const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./Routes/userRoute");
const { restRoute } = require("./Routes/RestaurantRoutes");
const { orderRoute } = require("./Routes/ordersRoutes");
const app = express();
require("dotenv").config();
app.use(cors())
app.use(express.json());
app.get("/", async (req, res) => {
  res.send("Welcome to Food api");
});

app.use("/api", userRouter);
app.use("/api", restRoute);
app.use("/api",orderRoute)

app.listen(process.env.port, (req, res) => {
  try {
    connection;
    console.log("Connected to database with port : 8088");
  } catch (error) {
    console.log(error);
  }
});
