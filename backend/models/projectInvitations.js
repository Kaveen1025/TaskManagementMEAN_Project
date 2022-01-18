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
    type: String,
    required: [true, "Project Invitation must have a Added date"],
    default: new Date().toLocaleString('si-LK', {timeZone : 'Asia/Colombo'}),
  },

  updatedDateTime: {
    type: Date,
    required: false
  },

  ProjectName: {
    type: String,
    required: true,
  },

  SenderName: {
    type: String,
    required: true
  },

  Image : {
    type: String,
    required: true
  }



});

const ProjectInvitation = mongoose.model("ProjectInvitation", projectInvitaionSchema);
module.exports = ProjectInvitation;
