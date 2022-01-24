const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ActivitySchema = new Schema({

  ActivityName: {
    type: String,
    required: [true, "Activity must have an Activity name"],
  },

  CreatorID: {
    type: String,
    required: [true, "Activity must have an Creator's ID"],
  },

  ProjectID: {
    type: String,
    required: [true, "Activity must have a Project ID"],
  },

  TaskIDs : [{
    type : String,
    required : false
  }],

  addedDateTime: {
    type: String,
    required: [true, "Activity must have a Added date"],
    default: new Date().toLocaleString('si-LK', {timeZone : 'Asia/Colombo'}),
  },


});

const Activity = mongoose.model("Activity", ActivitySchema);
module.exports = Activity;
