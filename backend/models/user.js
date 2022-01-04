const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  FirstName: {
    type: String,
    required: true,
  },

  LastName: {
    type: String,
    required: true,
  },

  Username: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
  },

  Password: {
    type: String,
    required: true,
  },

  Friends : [{
    type : String,
    required : false
  }],

  RequestedFriends : [{
    type : String,
    required : false
  }],

  Workspaces : [{
    type : String,
    required : false
  }],

  Projects : [{
    type : String,
    required : false
  }],

  FriendsRequests : [{
    type : String,
    required : false
  }],

  NotificationIDs : [{
    type : String,
    required : false
  }],

  ProjectInvitationIDs : [{
    type : String,
    required : false
  }],

  ProjectInvitationIDs : [{
    type : String,
    required : false
  }],



});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
