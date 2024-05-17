const mongoose = require("mongoose");

const connectionString = "mongodb+srv://aniket:aniket04@cluster0.ixsayoe.mongodb.net/Task_Manager?retryWrites=true&w=majority&appName=Cluster0"

//if connected to DB then only server will run
const connectDB = (url)=>{
    return mongoose.connect(url)
}

module.exports = connectDB;

