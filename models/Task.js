const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true,'must provide name'], //if the value to name is passed of any other type then error will occur
        trim : true,
        maxlength : [20, 'name cannot exceed 20 characters'],
    },
    completed: {
        type : Boolean,
        default: false,
    }
});

module.exports = mongoose.model("Task", TaskSchema);