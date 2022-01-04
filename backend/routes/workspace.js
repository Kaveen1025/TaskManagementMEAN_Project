const router = require("express").Router();
let Workspace = require("../models/workspace");

//Create new Workspace
router.route("/create").post((req, res) => {
  const {
    WorkspaceName,
    Description,
    MainImage,
    CoverImage,
    AdminID,
    ProjectIDs,
    MemberIDs,
    guestIDs,
    addedDateTime,
    insertedUser
  } = req.body;

  const newWorkspace = new Workspace({
    WorkspaceName,
    Description,
    MainImage,
    CoverImage,
    AdminID,
    ProjectIDs,
    MemberIDs,
    guestIDs,
    addedDateTime,
    insertedUser
  });

  newWorkspace
    .save()
    .then(() => {
      res.json("Workspace Added sucessfully");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({message: error.message});
    });
});


//Get All Workspaces
router.route("/getWorkspaces").get((req, res) => {
  //Variable declared at line 5
  Workspace.find()
    .then((workspace) => {
      res.json(workspace);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get One workspace by ID
router.route("/getWorkspaceByID/:id").get(async (req, res) => {
  let workspaceID = req.params.id;

  //can use findOne if searching by another attribute
  const order = await Workspace.findById(workspaceID)
    .then((workspace) => {
      res.json(workspace);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({status: "Error with get Order", error: err.message});
    });
});

//Delete Workspace
router.route("/deleteWorkspace/:id").delete(async (req, res) => {
  let workspceID = req.params.id;

  await Workspace.findByIdAndDelete(workspceID)
    .then(() => {
      res.status(200).send({status: "Workspace deleted"});
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({status: "Error while deleting workspace", error: err.message});
    });
});


//Update Workspace
router.route("/updateWorkspace/:id").put(async (req, res) => {
  let date_ob = new Date();
  // current date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  let workspaceID = req.params.id;
  const {WorkspaceName, Description, MainImage, CoverImage, updatedUser} = req.body;

  const updatedWorkspace = await Workspace.updateOne(
    {_id: workspaceID},
    {
      $set: {
        WorkspaceName: WorkspaceName,
        Description: Description,
        MainImage: MainImage,
        CoverImage: CoverImage,
        updatedUser: updatedUser,
        updatedDateTime: year + "-" + month + "-" + date
      },
    }
  )
    .then(() => {
      res.status(200).send({status: "Updated"});
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({status: "Error with updating data", error: err.message});
    });
});


//Delete Project from Workspace
router.route("/deleteWorkspace/:id").delete(async (req, res) => {
  let workspceID = req.params.id;

  await Workspace.findByIdAndDelete(workspceID)
    .then(() => {
      res.status(200).send({status: "Workspace deleted"});
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({status: "Error while deleting workspace", error: err.message});
    });
});

//delete Project from Workspace
router.route("/removeProject/:workspaceID/:projectID").delete(async (req, res) => {
  let workspaceID = req.params.workspaceID;
  let projectID = req.params.projectID;

  try {
    const result = await Workspace.findOneAndUpdate(
      {_id: workspaceID},
      {$pull: {ProjectIDs: projectID}}
    );
    res.status(200).send({status: "Project removed successfully"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});

//remove Member from Workspace
router.route("/removeMember/:workspaceID/:memberID").delete(async (req, res) => {
  let workspaceID = req.params.workspaceID;
  let memberID = req.params.memberID;

  try {
    const result = await Workspace.findOneAndUpdate(
      {_id: workspaceID},
      {$pull: {MemberIDs: memberID}}
    );
    res.status(200).send({status: "Member removed successfully"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});

// check whether the Project is in Workspace or not
router.route("/checkProject/:workspaceid/:projectid").get((req, res) => {
  let workspaceid = req.params.workspaceid;
  let projectid = req.params.projectid;
  let status = false;

  const getOne = Workspace.findOne({_id: workspaceid}).exec((err, post) => {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < post.ProjectIDs.length; i++) {
        if (projectid === post.ProjectIDs[i]) {
          status = true;
          break;
        } else {
          status = false
        }
      }
      res.send(status);
    }
  });
});

// check whether the User is already a member in Workspace or not
router.route("/checkMember/:workspaceid/:memberID").get((req, res) => {
  let workspaceid = req.params.workspaceid;
  let memberID = req.params.memberID;
  let status = false;

  const getOne = Workspace.findOne({_id: workspaceid}).exec((err, post) => {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < post.MemberIDs.length; i++) {
        if (memberID === post.MemberIDs[i]) {
          status = true;
          break;
        } else {
          status = false
        }
      }
      res.send(status);
    }
  });
});

// check whether the User is already a guest in Workspace or not
router.route("/checkGuest/:workspaceid/:guestID").get((req, res) => {
  let workspaceid = req.params.workspaceid;
  let guestID = req.params.guestID;
  let status = false;

  const getOne = Workspace.findOne({_id: workspaceid}).exec((err, post) => {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < post.guestIDs.length; i++) {
        if (guestID === post.guestIDs[i]) {
          status = true;
          break;
        } else {
          status = false
        }
      }
      res.send(status);
    }
  });
});

//Add a project to a Workspace
router.route("/addProject/:workspaceID/:projectID").put(async (req, res) => {
  let workspaceID = req.params.workspaceID;
  let projectID = req.params.projectID;

  try {
    const result = await Workspace.findOneAndUpdate(
      {_id: workspaceID},
      {$push: {ProjectIDs: projectID}}
    );
    res.status(200).send({status: "Project added to workspace successfully"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});

//Add a member to a Workspace
router.route("/addMember/:workspaceID/:memberID").put(async (req, res) => {
  let workspaceID = req.params.workspaceID;
  let memberID = req.params.memberID;

  try {
    const result = await Workspace.findOneAndUpdate(
      {_id: workspaceID},
      {$push: {MemberIDs: memberID}}
    );
    res.status(200).send({status: "Member added to workspace successfully"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});

//Add a guest to a Workspace
router.route("/addGuest/:workspaceID/:guestID").put(async (req, res) => {
  let workspaceID = req.params.workspaceID;
  let guestID = req.params.guestID;

  try {
    const result = await Workspace.findOneAndUpdate(
      {_id: workspaceID},
      {$push: {guestIDs: guestID}}
    );
    res.status(200).send({status: "Guest added to workspace successfully"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});


module.exports = router;