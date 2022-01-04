const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  FirstName: {
    type: String,
    required: [true, "User must have a First Name"],
  },

  LastName: {
    type: String,
    required: [true, "User must have a Last Name"],
  },

  Username: {
    type: String,
    required: [true, "User must have a User Name"],
  },

  Email: {
    type: String,
    required: [true, "User must have a Email"],
  },

  Password: {
    type: String,
    required: [true, "User must have a Password"],
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

  WorkSpaceInvitationIDs : [{
    type : String,
    required : false
  }],



});

const User = mongoose.model("User", userSchema);
module.exports = User;
