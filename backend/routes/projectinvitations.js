//Project Invitations Route

//Imports
const router = require("express").Router();
let ProjectInvitation = require('../models/projectInvitations');
const WorkspaceInvitaion = require("../models/workspaceInvitations");


//Create new ProjectInvitation
//URL -->http://localhost:8070/projectinv/add
router.route("/add").post((req, res) => {
  const {
    projectID,
    invitedUser,
    sendersID,
    ProjectName,
    SenderName,
    Image


  } = req.body;

  const newProjectInvitation = new ProjectInvitation({
    projectID,
    invitedUser,
    sendersID,
    ProjectName,
    SenderName,
    Image

  });

  newProjectInvitation
    .save()
    .then(() => {
      res.json("Project Invitation Added Successfully");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({message: error.message});
    });
});


//Fetch Project Invitation data according to user ID
//URL -->http://localhost:8070/projectinv/get/:userID
router.route('/get/:userID').get(async (req, res) => {
  let UserID = req.params.userID;

  ProjectInvitation.find({invitedUser:UserID}).then((projects) => {
    res.json(projects);
  }).catch((err) => {
    console.log(err.message);
    res
      .status(500)
      .send({ status: "Error with retrieving  Project", error: err.message });
  });

})


//Delete Project Invitation
//URL -->http://localhost:8070/projectinv/delete/:id
router.route("/delete/:id").delete(async (req, res) => {
  let ProjectInvitaionID = req.params.id;

  await ProjectInvitation.findByIdAndDelete(ProjectInvitaionID)
    .then(() => {
      res.status(200).send({status: "Project Invitation Successfully Deleted"});
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({status: "Error while deleting workspace Invitation", error: err.message});
    });
});

//Delete ProjectInvitaion using workspace ID and userID
//URL -->http://localhost:8070/projectinv/delete/:projectID/:userID
router.route("/delete/:projectID/:userID").delete(async (req, res) => {
  let UserID = req.params.userID;
  let ProjectID = req.params.projectID;


  await ProjectInvitation.findOneAndDelete({$and: [{projectID: ProjectID}, {invitedUser: UserID}]})
    .then((req2, res2) => {
      res.status(200).send({status: "Project Invitation deleted"});
    }).catch((err1) => {
      console.log(err1.message);

      res.status(500).send({status: "UserID or ProjectID is invalid", error: err1.message});
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({status: "Error while deleting Project Invitation", error: err.message});
    });
});

module.exports = router;
