const Task = require("../models/Task.js")

const getAllTasks = async (req,res)=>{
    try{
        const tasks = await Task.find({});
        res.status(200).json({tasks} );
    }
    catch(error){
        res.status(500).json({msg : error});
    }
}

/*code is attempting to set HTTP headers after the 
response has already been sent to the client. 
This typically happens when you try to send multiple
 responses for a single request. */
// const createTask = async (req, res)=>{
//     //res.send("create a task");
//     const task = await Task.create(req.body);
//     res.json(req.body);
//     res.status(201).json({ task });
// }

//solution for above problem
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        if (!res.headersSent) {
            res.status(201).json({ task });
        }
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({ msg : error }); //object of errors
        } else {
            console.error('Headers already sent:', error);
        }
    }
};


const getTask = async (req, res) => {
    const { id: taskID } = req.params;
    try {
        const task = await Task.findById(taskID);
        if (!task) {
            //console.log(`No task found with id: ${taskID}`);
            return res.status(404).json({ message: `No task found with id: ${taskID}` });
        }
        //console.log(`Task found: ${task}`);
        return res.status(200).json({ task });
    } catch (error) {
        console.error(`Error fetching task with id: ${taskID}`, error);
        return res.status(500).json({ error: error.message });
    }
};


const updateeTask = async (req, res)=>{
    try{
        const { id: taskID } = req.params;
        const task = await Task.findOneAndUpdate({_id : taskID}, req.body,{
            new: true,
            runValidators: true,
        });
        if (!task) {
            return res.status(404).json({ message: `No task found with id: ${taskID}` });
        }
        return res.status(200).json({task}) ;
    }
    catch(error){
        return res.status(500).json({error : error.message });
    }
 }

const deleteTask = async (req, res)=>{
    const { id: taskID } = req.params;
    try{
        const task = await Task.findOneAndDelete({_id : taskID});
        if (!task) {
            return res.status(404).json({ message: `No task found with id: ${taskID}` });
        }
        return res.status(200).json({ task });
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {getAllTasks,getTask,createTask,updateeTask, deleteTask };