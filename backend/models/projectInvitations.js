const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectInvitaionSchema = new Schema({

  projectID: {
    type: String,
    required: [true, "Project Invitation must have a Project ID"],
  },

  invitedUser: {
    type: String,
    required: [true, "Project Invitation must have a invitedUser"],
  },

  sendersID: {
    type: String,
    required: [true, "Project Invitation must have a sender ID"],
  },

  addedDateTime: {
    type: Date,
    required: [true, "Project Invitation must have a Added date"],
  },

  insertedUser: {
    type: String,
    required: [true, "Project Invitation must have a Added date"],
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

const ProjectInvitation = mongoose.model("ProjectInvitation", projectInvitaionSchema);
module.exports = ProjectInvitation;
