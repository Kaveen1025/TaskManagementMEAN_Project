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
  },

  insertedUser: {
    type: String,
    required: [true, "Notification must have a Added date"],
  },
  updatedDateTime: {
    type: date,
    required: false
  },

  updatedUser: {
    type: String,
    required: false
  }

});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
