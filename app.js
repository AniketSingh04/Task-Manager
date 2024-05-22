const express = require("express");
const app = express();
const tasks = require("./routes/tasks.js");
const connectDB = require('./controllers/db/connect.js')
require("dotenv").config()
const notFound = require("./middleware/not_found.js");
const errorHandlerMiddleware = require("./middleware/error_handler.js");

//middleware
app.use(express.json()) //for handling json requests
app.use(express.static("./public"));

//routes
app.use('/api/v1/tasks', tasks)

//Custom Middlewares
app.use(notFound); //customized 404 middleware used
app.use(errorHandlerMiddleware); //error-handler middleware should always be used at last

//App will run iff Connection to DB is successful
const port = process.env.PORT || 3000;
const start = async()=>{
    try{
        await connectDB(process.env.Mongo_URI)
        app.listen(port, console.log(`Server is listening on port ${3000}`));
    } 
    catch(error){
        console.log(error);
    }
}
start();



