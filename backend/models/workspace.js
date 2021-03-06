const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workspaceSchema = new Schema({
  WorkspaceName: {
    type: String,
    required: [true, "Workspace must have a Name"],
  },

  Description: {
    type: String,
    required: [true, "Workspace must have a Description"],
  },

  MainImage: {
    type: String,
    required: [true, "Workspace must have a Main image"],
  },

  CoverImage: {
    type: String,
    required: [true, "Workspace must have a Cover image"],
  },

  AdminID : {
    type : String,
    required : [true, "Workspace must have a Admin ID"],
  },

  ProjectIDs: [{
    type : String,
    required : false
  }],

  MemberIDs : [{
    type : String,
    required : false
  }],

  guestIDs: [{
    type : String,
    required : false
  }],

  addedDateTime: {
    type: Date,
    required: [true, "Workspace must have a Added date"],
    default: new Date()
  },

  updatedDateTime: {
    type: Date,
    required: false
  },



});

const Workspace = mongoose.model("Workspace", workspaceSchema);
module.exports = Workspace;
