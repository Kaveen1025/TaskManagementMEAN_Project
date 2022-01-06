const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema({

  Title: {
    type: String,
    required: [true, "Notification must have a Title"],
  },

  Description: {
    type: String,
    required: [true, "Notification must have a Description"],
  },

  NotifiedTime: {
    type: Date,
    required: [true, "Notification must have a Notifiedtime"],
  },

  addedDateTime: {
    type: Date,
    required: [true, "Notification must have a Added date"],
    default: new Date()
  },

  updatedDateTime: {
    type: date,
    required: false
  },


});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
