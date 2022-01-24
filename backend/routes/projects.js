//Projects Route

//Imports
const router = require("express").Router();
let Project = require('../models/projects');

// import getUserDetails from "./generic";
const generic = require('./generic');


const {
  ObjectId
} = require('mongodb');
const Workspace = require("../models/workspace");
//Add Projects --> Create Project Modal
//URL --> http://localhost:8070/project/add
router.route('/add').post((req,res) => {

  const {
    projectName,
    Description,
    Deadline,
    CoverImage,
    MainImage,
    AdminID,
    // MemberIDs,
    workspaceID


  } = req.body;

  const newProject = new Project({
    projectName,
    Description,
    Deadline,
    CoverImage,
    MainImage,
    AdminID,
    // MemberIDs,
    workspaceID
  })

  newProject.save()
    .then(() => {
      res.json("Project Added Successfully");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({message: error.message});
    });

})


//Fetch Projects According to the Name
//URL -->http://localhost:8070/project/getbyname/:name
router.route("/getbyname/:name").get(async (req, res) => {
  let projectName= req.params.name;
 await Project.findOne({projectName: projectName}).then((user)=>{
   res.json(user);
 }).catch((err) => {
   res.status(404).json({message: err.message});
 })
})


//Edit Project --> Edit Projects Modal
//URL --> http://localhost:8070/project/edit/:id
router.route("/edit/:id").put(async (req,res) => {
  let ProjectID= req.params.id;

  const { projectName,  Description, Deadline, MainImage, CoverImage} = req.body;
  const updatedProjects = await Project.updateOne(
    {_id: ProjectID},
    {
      $set: {
        projectName: projectName,
        Description: Description,
        MainImage: MainImage,
        CoverImage: CoverImage,
        Deadline : Deadline
      },
    }
  )
    .then(() => {
      res.status(200).send({status: "Project updated"});
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({status: "Error with updating Project data", error: err.message});
    });
})

//Fetch Projects According to the Project ID
//URL -->http://localhost:8070/project/get/:id
router.route("/get/:id").get(async (req, res) => {
  let ProjectID= req.params.id;
  await Project.findById(ProjectID).then((user)=>{
    res.json(user);
  }).catch((err) => {
    res.status(404).json({message: err.message});
  })
})


//Fetch Projects According to the WorkspaceID --> Workspaces Page
//URL -->http://localhost:8070/project/getbyworkspace/:id
router.route("/getbyworkspace/:id").get(async (req, res) => {
  let workspaceID= req.params.id;
  await Project.find({ workspaceID:workspaceID}).then((user)=>{
    res.json(user);
  }).catch((err) => {
    res.status(404).json({message: err.message});
  })
})


//Delete Project
//URL -->http://localhost:8070/project/deleteproject/:id
router.route("/deleteproject/:id").delete(async (req, res) => {

  let ProjectID = req.params.id;
  await Project.findByIdAndDelete(ProjectID).then(()=>{
    res.status(200).send({ status: "Project Deleted" });
  }).catch((err)=>{
    res.status(500).send({ status: "Error with delete", error: err.message });
  })
})


//Fetch user details according to memberID’s array
//URL --> http://localhost:8070/project/getuserdetails/:id
router.route('/getuserdetails/:id').get(async(req, res) => {

  let projectID = req.params.id;
  let memberIDArr = []
  await Project.findById(projectID).then((project) => {
    memberIDArr = project.MemberIDs;

    gg(memberIDArr);

    let arr = [];

    async function  gg(idArr){

      let Array = await generic.getUserDetails(idArr);

      console.log(Array);

      return res.json(Array);

    }


  })

})



//Add a Member
//URL -->http://localhost:8070/project/addmember/:projectID/:memberID
router.route("/addmember/:projectID/:memberID").put(async (req, res) => {
  let ProjectID = req.params.projectID;
  let MemberID = req.params.memberID;

  try {
    const result = await Project.findOneAndUpdate(
      {_id: ProjectID},
      {$push: {MemberIDs :MemberID}}
    );
    res.status(200).send({status: "Member Added successfully"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});


//Remove  Member
//URL --> http://localhost:8070/project/removemember/:projectID/:memberID
router.route("/removemember/:projectID/:memberID").delete(async (req, res) => {

  let ProjectID = req.params.projectID;
  let MemberID = req.params.memberID;
  try {
    const result = await Project.findOneAndUpdate(
      {_id: ProjectID},
      {$pull: {MemberIDs :MemberID}}
    );
    res.status(200).send({status: "Project Member Removed Successful!"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});


//Add an Activity to the Project
//URL -->http://localhost:8070/project/addActivity/:projectID/:activityID
router.route("/addActivity/:projectID/:activityID").put(async (req, res) => {
  let ProjectID = req.params.projectID;
  let ActivityID = req.params.activityID;

  try {
    const result = await Project.findOneAndUpdate(
      {_id: ProjectID},
      {$push: { ActivityIDs:ActivityID}}
    );
    res.status(200).send({status: "Activity Added to the Project successfully"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});


//Remove an Activity to the Project
//URL -->http://localhost:8070/project/removeActivity/:projectID/:activityID
router.route("/removeActivity/:projectID/:activityID").delete(async (req, res) => {
  let ProjectID = req.params.projectID;
  let ActivityID = req.params.activityID;

  try {
    const result = await Project.findOneAndUpdate(
      {_id: ProjectID},
      {$pull: { ActivityIDs:ActivityID}}
    );
    res.status(200).send({status: "Activity removed from the Project successfully"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});


//Get All Activity Details belong to a single project
//URL -->http://localhost:8070/project/getActivityDetails/:projectID

router.route("/getActivityDetails/:projectID").get(async (req, res) => {
  let projectID = req.params.projectID;
  try {
    const result = await Project.aggregate([
      {
        $match: { _id: ObjectId(projectID)},
      },
      {
        $project: {
          ActivityIDs: {
            $map: {
              input: "$ActivityIDs",
              as: "activityID",
              in: {
                $convert: {
                  input: "$$activityID",
                  to: "objectId"
                }
              }
            }
          }
        }
      },
      {
        $lookup: {
          from: "activities",
          localField: "ActivityIDs",
          foreignField: "_id",
          as: "ActivityDetails"
        }
      }
    ])
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//Get member details belong to a project
router.route("/getMemberDetails/:projectID").get(async (req, res) => {
  let projectID = req.params.projectID;
  try {
    const result = await Project.aggregate([
      {
        $match: { _id: ObjectId(projectID)},
      },
      {
        $project: {
          MemberIDs: {
            $map: {
              input: "$MemberIDs",
              as: "memberID",
              in: {
                $convert: {
                  input: "$$memberID",
                  to: "objectId"
                }
              }
            }
          }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "MemberIDs",
          foreignField: "_id",
          as: "Members"
        }
      }
    ])
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// check whether the User is already a member in Project or not
//URL --> http://localhost:8070/project/checkMember/:projectid/:memberID
router.route("/checkMember/:projectid/:memberID").get((req, res) => {
  let ProjectID = req.params.projectid;
  let memberID = req.params.memberID;
  let status = false;

  Project.findOne({_id: ProjectID}).exec((err, post) => {
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



module.exports = router;

