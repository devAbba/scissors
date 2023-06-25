const mongoose = require('mongoose')

const connectDB = (url) => {
    mongoose.connect(url)

    mongoose.connection.on("connected", () => {
        console.log("connected to mongodb successfully")
    })

    mongoose.connection.on("error", (error) => {
        console.log("there was a problem connecting to mongodb")
        console.log(error)  
    })
}

module.exports = connectDB;

