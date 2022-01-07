//Workspaces Route

//Imports
const router = require("express").Router();
let Project = require('../models/projects');

// import getUserDetails from "./generic";
const generic = require('./generic');
const User = require("../models/user");

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
    MemberIDs,
    workspaceID


  } = req.body;

  const newProject = new Project({
    projectName,
    Description,
    Deadline,
    CoverImage,
    MainImage,
    AdminID,
    MemberIDs,
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


//Fetch Projects According to the WorkspaceID
//URL -->http://localhost:8070/project/getbyworkspace/:id
router.route("/getbyworkspace/:id").get(async (req, res) => {
  let workspaceID= req.params.id;
  await Project.find({ workspaceID:workspaceID}).then((user)=>{
    res.json(user);
  }).catch((err) => {
    res.status(404).json({message: err.message});
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





module.exports = router;

