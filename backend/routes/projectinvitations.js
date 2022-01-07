//Project Invitations Route

//Imports
const router = require("express").Router();
let ProjectInvitation = require('../models/projectInvitations');


//Create new ProjectInvitation
//URL -->http://localhost:8070/
router.route("/add").post((req, res) => {
  const {
    projectID,
    invitedUser,
    sendersID,

  } = req.body;

  const newProjectInvitation = new ProjectInvitation({
    projectID,
    invitedUser,
    sendersID,
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




module.exports = router;
