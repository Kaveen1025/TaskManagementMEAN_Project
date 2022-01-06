const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({

  projectName: {
    type: String,
    required: [true, "Project must have a Project Name"],
  },

  Description: {
    type: String,
    required:[true, "Project must have a Description"],
  },

  MainImage: {
    type: String,
    required: [true, "Project must have a MainImage"],
  },

  CoverImage : {
    type : String,
    required : [true, "Project must have a Cover Image"],
  },

  AdminID: {
    type : String,
    required : [true, "Project must have a AdminID"],
  },

  MemberIDs : [{
    type : String,
    required : false
  }],

  Deadline: {
    type : String,
    required : false
  },

  workspaceID: {
    type : String,
    required : false
  },

  addedDateTime: {
    type: Date,
    required: [true, "Project must have a Added date"],
  },

  insertedUser: {
    type: String,
    required: [true, "Project must have a Added date"],
  },
  updatedDateTime: {
    type: Date,
    required: false
  },

  updatedUser: {
    type: String,
    required: false
  }

});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
