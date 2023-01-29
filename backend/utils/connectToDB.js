const mongoose = require("mongoose");
require('dotenv').config()

const url = process.env.MONGO_CONNECTION_STRING

const connect = mongoose.connect(url)
connect.then(db => {
    console.log("connected to database")
}).catch(err => {
    console.log(err)
})