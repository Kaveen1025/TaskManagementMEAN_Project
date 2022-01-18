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
    default: new Date()
  },

  updatedDateTime: {
    type: Date,
    required: false
  },

  WorkspaceName: {
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

const WorkspaceInvitation = mongoose.model("WorkspaceInvitation", workspaceInvitationSchema);
module.exports = WorkspaceInvitation;
