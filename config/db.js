 // Here we will make connection for the MongoDB Atlas

 const mongoose = require('mongoose')
require("dotenv").config()
const connection = mongoose.connect(process.env.mongourl)

//exporting the connection
module.exports ={
    connection
}