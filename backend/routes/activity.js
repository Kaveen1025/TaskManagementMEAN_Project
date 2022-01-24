//Activity Router

//Imports
const router = require("express").Router();
let Activity = require("../models/activity");

const {ObjectId} = require("mongodb");
const Subtask = require("../models/subtask");


//Create Activity
//URL --> http://localhost:8070/activity/create
router.route("/create").post((req, res) => {

  const  {
    ActivityName,
    CreatorID,
    ProjectID
  } = req.body;

  const newActivity = new Activity({
    ActivityName,
    CreatorID,
    ProjectID
  })


  newActivity.save().then(() => {
    res.json("Activity Created Successfully");
  })
    .catch((err) => {
      console.log(err);
      res.status(404).json({message: error.message});
    });
})


//Edit Activity Name
//URL -->http://localhost:8070/activity/updatename/:id
router.route("/updatename/:id").put(async (req, res) => {

  let ActivityID = req.params.id;
  let {ActivityName} = req.body;

  const updateST = await Activity.updateOne(
    { _id:ActivityID },
    {
      $set: {
        ActivityName:ActivityName
      },
    }
  )
    .then(() => {
      res.status(200).send({ status: "Activity Name Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});


//Add a Task to the Activity
//URL -->http://localhost:8070/activity/addTask/:activityID/:taskID
router.route("/addTask/:activityID/:taskID").put(async (req, res) => {
 let ActivityID = req.params.activityID;
 let TaskID = req.params.taskID;

  try {
    const result = await Activity.findOneAndUpdate(
      {_id: ActivityID},
      {$push: { TaskIDs: TaskID}}
    );
    res.status(200).send({status: "Task added to the project Successfully! "});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});


//Remove a Task from the Activity
//URL --> http://localhost:8070/activity/removeTask/:activityID/:taskID
router.route("/removeTask/:activityID/:taskID").delete(async (req, res) => {

  let ActivityID = req.params.activityID;
  let TaskID = req.params.taskID;

  try {
    const result = await Activity.findOneAndUpdate(
      {_id: ActivityID},
      {$pull: { TaskIDs: TaskID}}
    );
    res.status(200).send({status: "Task removed from the  project Successfully!"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});


//Get One Activity with Lookup
//URL -- > http://localhost:8070/activity/getOne/:id
router.route("/getOne/:id").get(async (req, res) => {
  let ActivityID = req.params.id;
  try {
    const result = await Activity.aggregate([
      {
        $match: { _id: ObjectId(ActivityID)},
      },
      {
        $project: {
          TaskIDs: {
            $map: {
              input: "$TaskIDs",
              as: "taskIDs",
              in: {
                $convert: {
                  input: "$$taskIDs",
                  to: "objectId"
                }
              }
            }
          }
        }
      },
      {
        $lookup: {
          from: "tasks",
          localField: "TaskIDs",
          foreignField: "_id",
          as: "TaskDetails"
        }
      }
    ])
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


//Get All Activities
//URL --> http://localhost:8070/activity/getAll
router.route("/getAll").get((req, res) => {
  Activity.find()
    .then((subtasks) => {
      res.json(subtasks);
    })
    .catch((err) => {
      res.status(404).json({message: error.message});
    });


})


//Delete an Activity
//URL --> http://localhost:8070/activity/delete/:id
router.route("/delete/:id").delete(async(req,res)=> {

  let ActivityID = req.params.id;

  await Activity.findByIdAndDelete(ActivityID).then(()=>{
    res.status(200).send({ status: "Activity Deleted!" });
  }).catch((err)=>{
    res.status(500).send({ status: "Error with delete", error: err.message });
  })


})

module.exports = router;
