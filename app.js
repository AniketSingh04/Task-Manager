const express = require("express");
const app = express();
const tasks = require("./routes/tasks.js");

//middleware
app.use(express.json()) //for handling json requests


//routes
app.get("/hello", (req, res) =>{
    console.log("Hello");
    res.send("Task Manager")
})

app.use('/api/v1/tasks', tasks)

















const port = 3000;
app.listen(3000, () => {
    console.log(`Server is listening on port ${3000}`);
})