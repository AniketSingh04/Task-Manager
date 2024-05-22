const Task = require("../models/Task.js")
const asyncWrapper = require("../middleware/async.js");
const { createCustomAPIError } = require("../errors/custom_error.js");
//wrapping all the fucntions in asyncWrapper middleware

const getAllTasks = asyncWrapper(async (req,res)=>{
        const tasks = await Task.find({});
        res.status(200).json({tasks} );
       // res.status(200).json({ success: true, data:{tasks, no_of_hits: tasks.length}});
       //res.status(200).json({ status : 'success', data:{tasks, no_of_hits: tasks.length}});
})

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

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    if (!res.headersSent) {
        res.status(201).json({ task });
    }
});

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findById(taskID);
    if (!task) {
        return next(createCustomAPIError(`No task found with id: ${taskID}`, 404));
    }
    return res.status(200).json({ task });
});


const updateeTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!task) {
        return next(createCustomAPIError(`No task found with id: ${taskID}`, 404));
    }
    return res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res)=>{
    const { id: taskID } = req.params;
        const task = await Task.findOneAndDelete({_id : taskID});
        if (!task) {
            return next(createCustomAPIError(`No task found with id: ${taskID}`, 404));
        }
        return res.status(200).json({ task });
});

module.exports = {getAllTasks,getTask,createTask,updateeTask, deleteTask };