const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  TaskName: {
    type: String,
    required: [true, "Task must have a name"],
  },

  InsertUserID: {
    type: String,
    required: [true, "Task must have a insert user"],
  },
  WorkStatus: {
    type: String,
    required: [true, "Task must have a work status"],
    default: "0"
  },
  ActivityID: {
    type: String,
    required: [true, "Task must have a activityID"],
  },
  SubTaskIDs : [{
    type : String,
    required : false
  }],

  DeadLine: {
    type: Date,
    required: true,
    default: new Date(),
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const Task = mongoose.model("Task", taskSchema);
//Student is changing to "students"s when it creates a collection
module.exports = Task;
