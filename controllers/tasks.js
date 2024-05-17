const Task = require("../models/Task.js")


const getAllTasks = (req,res)=>{
    res.send("get all tasks");
}

const createTask = async (req, res)=>{
    //res.send("create a task");
    const task = await Task.create(req.body);
    res.json(req.body);
    res.status(201).json({ task });
}

const getTask = (req, res)=>{
    //res.send("get a single task");
    res.json({id: req.params.id});
}

const updateeTask = (req, res)=>{
     res.send("update a task");
 }

const deleteTask = (req, res)=>{
    res.send("delete a task");
}

module.exports = {getAllTasks,getTask,createTask,updateeTask, deleteTask };