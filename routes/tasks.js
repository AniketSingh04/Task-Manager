const express = require("express");
const router = express.Router();
const {getAllTasks,getTask,createTask,updateeTask, deleteTask} = require("../controllers/tasks.js");


router.route("/").get(getAllTasks).post(createTask)
router.route("/:id").get(getTask).patch(updateeTask).delete(deleteTask)

module.exports = router;