const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workspaceInvitationSchema = new Schema({

  workspaceID: {
    type: String,
    required: [true, "Workspace Invitation must have a Workspace ID"],
  },

  invitedUser: {
    type: String,
    required: [true, "Workspace Invitation must have a InvitedUser"],
  },

  sendersID: {
    type: String,
    required: [true, "Workspace Invitation must have a Sender ID"],
  },

  addedDateTime: {
    type: Date,
    required: [true, "Workspace Invitation must have a Added date"],
  },

  insertedUser: {
    type: String,
    required: [true, "Workspace Invitation must have a Added date"],
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

const WorkspaceInvitation = mongoose.model("WorkspaceInvitation", workspaceInvitationSchema);
module.exports = WorkspaceInvitation;
