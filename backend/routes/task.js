const router = require("express").Router();
let Task = require("../models/task");

const {
  ObjectId
} = require('mongodb');
const Workspace = require("../models/workspace");

//Create new Task
router.route("/create").post((req, res) => {
  const {
    TaskName,
    ActivityID,
    InsertUserID,
    DeadLine,
  } = req.body;

  const newTask = new Task({
    TaskName,
    ActivityID,
    InsertUserID,
    DeadLine,
  });

  newTask
    .save()
    .then(() => {
      res.json("Task Added sucessfully");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({message: error.message});
    });
});

//Get All Tasks
router.route("/getTasks").get((req, res) => {
  Task.find()
    .then((workspace) => {
      res.json(workspace);
    })
    .catch((err) => {
      console.log(err);
      res.json(err)
    });
});

//Get All tasks belong to one activity
router.route("/getTasksBelongtoOneActivity/:id").get(async (req, res) => {
  let activityID = req.params.id;

  //can use findOne if searching by another attribute
  await Task.find({ActivityID: activityID})
    .then((workspace) => {
      res.json(workspace);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({status: "Error while getting tasks", error: err.message});
    });
});


//Delete Tasks
router.route("/deleteTasks/:id").delete(async (req, res) => {
  let taskID = req.params.id;

  await Task.findByIdAndDelete(taskID)
    .then(() => {
      res.status(200).send({status: "Task deleted"});
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({status: "Error while deleting task", error: err.message});
    });
});


//Update Task
router.route("/updateTask/:id").put(async (req, res) => {

  let taskID = req.params.id;
  const {TaskName, DeadLine} = req.body;

   await Task.updateOne(
    {_id: taskID},
    {
      $set: {
        TaskName: TaskName,
        DeadLine: DeadLine,
        updatedDateTime: new Date()
      },
    }
  )
    .then(() => {
      res.status(200).send({status: "Task updated"});
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({status: "Error with updating data", error: err.message});
    });
});

//Edit Task Work status
router.route("/updateTaskWorkStatus/:id/:value").put(async (req, res) => {

  let taskID = req.params.id;
  let value = req.params.value;

  await Task.updateOne(
    {_id: taskID},
    {
      $set: {
        WorkStatus: value,
        updatedDateTime: new Date()
      },
    }
  )
    .then(() => {
      res.status(200).send({status: "Task work status updated"});
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({status: "Error while updating work status", error: err.message});
    });
});

//delete sub task from Task
router.route("/removeSubTask/:taskID/:subTaskID").delete(async (req, res) => {
  let taskID = req.params.taskID;
  let subTaskID = req.params.subTaskID;

  try {
    await Task.findOneAndUpdate(
      {_id: taskID},
      {$pull: {SubTaskIDs: subTaskID}}
    );
    res.status(200).send({status: "SubTask removed successfully"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});


//Get all SubTasks belongs to a single Task
//meka hdannna dulan ghavat psse
router.route("/getSubTaskDetails/:taskID").get(async (req, res) => {
  let taskID = req.params.taskID;
  try {
    const result = await Task.aggregate([
      {
        $match: { _id: ObjectId(taskID)},
      },
      {
        $project: {
          SubTaskIDs: {
            $map: {
              input: "$SubTaskIDs",
              as: "taskID",
              in: {
                $convert: {
                  input: "$$taskID",
                  to: "objectId"
                }
              }
            }
          }
        }
      },
      {
        $lookup: {
          from: "subtasks",
          localField: "SubTaskIDs",
          foreignField: "_id",
          as: "subTasks"
        }
      }
    ])
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});



module.exports = router;
