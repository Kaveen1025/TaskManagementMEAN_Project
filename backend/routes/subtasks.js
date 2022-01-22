//Subtasks Router

//Imports
const router = require("express").Router();
let Subtask = require("../models/subtask");






//Create SubTask
//URL --> http://localhost:8070/subtask/create
router.route("/create").post((req, res) => {

  const  {
    SubTaskName,
    CreatorID,

  } = req.body;

  const newSubTask = new Subtask({
    SubTaskName,
    CreatorID,

  })


  newSubTask.save().then(() => {
    res.json("Subtask Created Successfully");
  })
    .catch((err) => {
      console.log(err);
      res.status(404).json({message: error.message});
    });
})


//Get One Subtask
//URL -->  http://localhost:8070/subtask/getOne/:id
router.route("/getOne/:id").get(async (req, res) => {
  let SubTaskID = req.params.id;

  await Subtask.findById(SubTaskID).then((subtask) => {
    res.json(subtask);
  }).catch((err) => {
    res.status(404).json({message: error.message});
  })
})


//Get All Sub Tasks
//URL -->  http://localhost:8070/subtask/getAll

router.route("/getAll").get((req, res) => {
  Subtask.find()
    .then((subtasks) => {
      res.json(subtasks);
    })
    .catch((err) => {
      res.status(404).json({message: error.message});
    });


})


//Delete a sub task
//URL --> http://localhost:8070/subtask/delete/:id
router.route("/delete/:id").delete(async(req,res)=> {

  let SubTaskID = req.params.id;

  await Subtask.findByIdAndDelete(SubTaskID).then(()=>{
    res.status(200).send({ status: "Sub Task Deleted!" });
  }).catch((err)=>{
    res.status(500).send({ status: "Error with delete", error: err.message });
  })


})



//Update SubTask name
//URL -->http://localhost:8070/subtask/updatename/:id
router.route("/updatename/:id").put(async (req, res) => {

  let SubTaskID = req.params.id;
  let { SubTaskName } = req.body;

  let updatedDateTime =  new Date().toLocaleString('si-LK', {timeZone : 'Asia/Colombo'});

  const updateST = await Subtask.updateOne(
    { _id: SubTaskID },
    {
      $set: {
        SubTaskName: SubTaskName,
        updatedDateTime:updatedDateTime
      },
    }
  )
    .then(() => {
      res.status(200).send({ status: "Sub Task Name Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});



//Update SubTask Status
//URL -->http://localhost:8070/subtask/updatestatus/:id
router.route("/updatestatus/:id").put(async (req, res) => {

  let SubTaskID = req.params.id;
  let { CompleteStatus,
    CheckedUserID} = req.body;

  let updatedDateTime =  new Date().toLocaleString('si-LK', {timeZone : 'Asia/Colombo'});


  const updateST = await Subtask.updateOne(
    { _id: SubTaskID },
    {
      $set: {
        CompleteStatus:CompleteStatus,
        CheckedUserID:CheckedUserID,
        updatedDateTime:updatedDateTime
      },
    }
  )
    .then(() => {
      res.status(200).send({ status: "Sub Task Status Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});








module.exports = router;
