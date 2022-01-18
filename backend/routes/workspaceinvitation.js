const router = require("express").Router();
let WorkspaceInvitaion = require("../models/workspaceInvitations");
let User = require("../models/user");
let Workspace = require("../models/workspace");
const generic = require('./generic');
const res = require("express");

//Create new WorkspaceInvitation
//URL --> http://localhost:8070/workspaceinvitation/create
router.route("/create").post((req, res) => {
  const {
    workspaceID,
    invitedUser,
    sendersID,
    WorkspaceName,
    SenderName,
    Image

  } = req.body;



  const newWorkspaceInvitation = new WorkspaceInvitaion({
    workspaceID,
    invitedUser,
    sendersID,
    WorkspaceName,
    SenderName,
    Image

  });

  newWorkspaceInvitation
    .save()
    .then(() => {
      res.json("Invitation sent sucessfully");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({message: error.message});
    });
});


//Get All WorkspaceInvitation
router.route("/getWorkspaceInvitations").get((req, res) => {

  WorkspaceInvitaion.find()
    .then((workspaceinvitation) => {
      res.json(workspaceinvitation);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get One WorkspaceInvitation by ID
router.route("/getWorkspaceInvitationByID/:id").get(async (req, res) => {
  let workspaceInvitationID = req.params.id;

  //can use findOne if searching by another attribute
  const order = await WorkspaceInvitaion.findById(workspaceInvitationID)
    .then((workspaceInvitation) => {
      res.json(workspaceInvitation);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({status: "Error while getting workspace Invitation", error: err.message});
    });
});

//Delete Workspace Invitation
router.route("/deleteWorkspaceInvitation/:id").delete(async (req, res) => {
  let workspceInvitaionID = req.params.id;

  await WorkspaceInvitaion.findByIdAndDelete(workspceInvitaionID)
    .then(() => {
      res.status(200).send({status: "Workspace Invitation deleted"});
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({status: "Error while deleting workspace Invitation", error: err.message});
    });
});

//Delete WorkspaceInvitaion using workspace ID and userID
router.route("/deleteWorkspaceInvitationacco/:workspaceID/:userID").delete(async (req, res) => {
  let userID = req.params.userID;
  let workspaceID = req.params.workspaceID;

  //Metana invalid ids dunnath success message eka enne ai blanna?
  await WorkspaceInvitaion.findOneAndDelete({$and: [{workspaceID: workspaceID}, {invitedUser: userID}]})
    .then((req2, res2) => {
      res.status(200).send({status: "Workspace Invitation deleted"});
    }).catch((err1) => {
      console.log(err1.message);

      res.status(500).send({status: "UserID or WorkspaceID is invalid", error: err1.message});
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({status: "Error while deleting workspace Invitation", error: err.message});
    });
});

//Get All WorkspaceInvitation according to a user
//URL --> http://localhost:8070/workspaceinvitation/getWorkspaceInvitationsaccoUser/61d458c91d0655dd1358454a
router.route("/getWorkspaceInvitationsaccoUser/:userID").get( async(req, res) => {
  let userID = req.params.userID;

   await WorkspaceInvitaion.find({invitedUser: userID})
    .then(  (workspaceinvitation) => {
      res.json(workspaceinvitation);

    })
    .catch((err) => {
      console.log(err);
    });
});












module.exports = router;
