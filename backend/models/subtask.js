const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubTaskSchema = new Schema({

  SubTaskName: {
    type: String,
    required: [true, "Sub Task must have an Activity name"],
  },

  CreatorID: {
    type: String,
    required: [true, "SubTask must have an Creator's ID"],
  },

  CheckedUserID: {
    type: String,
    required: false,
  },

  CompleteStatus: {
    type: Boolean,
    required: true,
    default: false
  },


  addedDateTime: {
    type: String,
    required: [true, "Sub Task must have a Added date"],
    default: new Date().toLocaleString('si-LK', {timeZone : 'Asia/Colombo'}),
  },

  updatedDateTime: {
    type: String,
    required: false,
    default: new Date().toLocaleString('si-LK', {timeZone : 'Asia/Colombo'}),
  },



});

const SubTask = mongoose.model("SubTask", SubTaskSchema);
module.exports = SubTask;
