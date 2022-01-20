//users route

//Imports
const router = require("express").Router();
let User = require("../models/user");
const bcrypt = require("bcryptjs");

// import getUserDetails from "./generic";
const generic = require('./generic');
const {ObjectId} = require("mongodb");



//Add user --> Signup Page
//URL -- >http://localhost:8070/user/add
router.route("/add").post(async(req,res)=>{

  const{
    Username,
    Email,
    FirstName,
    LastName,
    Password,
    GoogleSignIn,
    ProfileImage
  }= req.body;

  try{
    //Verify whether email or the username already exists
    const emailExist = await User.findOne({ Email: Email });

    if (emailExist) {

       res.json("Email Already Exist");


    }

    const usernameExist = await User.findOne({ Username: Username });

    if (usernameExist) {

      res.json("Username Already Exist");
    }

    else if(!emailExist && !usernameExist){

      const newUser = new User({
        Username,
        Email,
        FirstName,
        LastName,
        Password,
        GoogleSignIn,
        ProfileImage
      })

      await newUser.save();
      res.json("User Added Successfully!");
    }

  }catch (err){

    console.log(err);

  }
})


//Get All Users
//URL -- >http://localhost:8070/user/getAll
router.route("/getAll").get((req, res) => {
  User.find()
    .then((customer) => {
      res.json(customer);
    })
    .catch((err) => {
      console.log(err);
    });
});


//Get a single user --> User Profile Page
//URL -- >http://localhost:8070/user/get/:id
router.route('/get/:id').get(async (req,res) =>{
  let userID = req.params.id;
  const user = await User.findById(userID)
    .then((users) => {
      // res.status(200).send({status:"User fetched"});
      res.json(users);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message });
    });
})


//Get a user by name
//URL -->http://localhost:8070/user/getbyname/:name
router.route("/getbyname/:name").get(async (req,res) => {
  let name = req.params.name;
  await User.find({$or:[{'FirstName' : name}, {'LastName' : name}]}).then((user) => {
    res.json(user);
  }).catch((err) => {
        res.status(500)
      .send({ status: "Error with retrieving  user", error: err.message });
  })
})

//Update User --> Edit Profile Page ---> Changed
//URL --> http://localhost:8070/user/update/:id/:status
router.route('/update/:id/:status').put(async (req,res)=> {

  let userID = req.params.id;
  let status = req.params.status;

  const {Value} = req.body;


  if (status == 1) {
    // First Name

    const updatedUser = await User.updateOne(
      {_id: userID},
      {
        $set: {
          FirstName: Value,
        }
      }
    ).then(() => {
      res.status(200).send({status: "First Name Updated"});
    }).catch((err) => {
      res
        .status(500)
        .send({status: "Error with updating data", error: err.message});
    })
  } else if (status == 2) {
    // Last Name

    const updatedUser2 = await User.updateOne(
      {_id: userID},
      {
        $set: {
          LastName: Value,
        }
      }
    ).then(() => {
      res.status(200).send({status: "Last Name Updated"});
    }).catch((err) => {
      res
        .status(500)
        .send({status: "Error with updating data", error: err.message});
    })
  } else if (status == 3) {
    //Image

    const updatedUser3 = await User.updateOne(
      {_id: userID},
      {
        $set: {
          ProfileImage: Value,
        }
      }
    ).then(() => {
      res.status(200).send({status: "Profile Image Updated"});
    }).catch((err) => {
      res
        .status(500)
        .send({status: "Error with updating data", error: err.message});
    })
  } else {
    // code block
    res
      .status(500)
      .send({status: "Invalid Update Status"});
  }


})


// currently, using
//Update User --> Edit Profile Page
//URL --> http://localhost:8070/user/update/:id
router.route('/updateDetails/:id').put(async (req,res)=> {

  let userID = req.params.id;

  const {FirstName, LastName} = req.body;

  const updatedUser = await User.updateOne(
    {_id: userID},
    {
      $set:{
        FirstName: FirstName,
        LastName : LastName,
      }
    }
  ).then(() =>{
    res.status(200).send({status: "User Profile Updated"});
  }).catch((err) => {
    res
      .status(500)
      .send({status: "Error with updating data", error: err.message});
  })
})
// currently, using
//Update User --> Edit Profile image
//URL --> http://localhost:8070/user/updateUserProfile/:id
router.route('/updateUserProfile/:id').put(async (req,res)=> {

  let userID = req.params.id;

  const {ProfileImage} = req.body;

  const updatedUser = await User.updateOne(
    {_id: userID},
    {
      $set:{
        ProfileImage: ProfileImage
      }
    }
  ).then(() =>{
    res.status(200).send({status: "User Profile Updated"});
  }).catch((err) => {
    res
      .status(500)
      .send({status: "Error with updating data", error: err.message});
  })
})

//Delete User -->Edit Profile Page
//URL -->http://localhost:8070/user/delete/:id
router.route('/delete/:id').delete(async (req, res) => {
  let userID = req.params.id;
  await User.findByIdAndDelete(userID).then(()=>{
    res.status(200).send({ status: "User Deleted" });
  }).catch((err)=>{
    res.status(500).send({ status: "Error with delete", error: err.message });
  })
})


//Login Validation --> Login Page
//URL -->http://localhost:8070/user/loginUser

router.post("/loginUser", async (req, res) => {
  try {
    const { Username, Password } = req.body;

    //check with database username

    let customerLogin = await User.findOne({ Username: Username });

    if (customerLogin) {
      const isMatch = await bcrypt.compare(Password, customerLogin.Password);

      if (!isMatch) {
        res.json("Invalid Credentials");
      } else {
        res.json("Customer Sign In Successfully");
      }
    } else {
      res.json("User Does not exist");
    }
  } catch (err) {
    console.log(err);
  }
});


//Get User by Email
//URL --> http://localhost:8070/user/getUser/:email
router.route("/getUser/:email").get(async (req, res) => {
  let email = req.params.email;

  const user = await User.find({ Email: email })
    .then((user) => {

      res.json(user);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with retrieving  user", error: err.message });
    });
});

//Update Password According to the UserID --> Change Password Page
//URL -->http://localhost:8070/user/updatePassword/:id
router.route("/updatePassword/:id").put(async (req, res) => {
  let userID = req.params.id;

  let { Password } = req.body;

  let salt = bcrypt.genSaltSync(12);
  Password = bcrypt.hashSync(Password, salt);

  console.log(Password);

  const updateC = await User.updateOne(
    { _id: userID },
    {
      $set: {
        Password: Password,
      },
    }
  )
    .then(() => {
      res.status(200).send({ status: "Password Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});


//Get User Details according to the friends array
//URL --> http://localhost:8070/user/getFriends/:id
router.route('/getFriends/:id').get(async (req,res)=>{

  let userID = req.params.id;
  let friendsArray = [];

  await User.findById(userID).then((user)=>{

    console.log("Friends Array : ");
    console.log(friendsArray);

    friendsArray = user.Friends;

    gg(friendsArray);

    let arr = [];

    async function  gg(idArr){

      let Array = await generic.getUserDetails(idArr);

      console.log(Array);

      return res.json(Array);

    }

  }).catch((err) =>{
    console.log(err);
  })
})



//Add a friend
//URL -->http://localhost:8070/user/addfriend/:userID/:friendID
router.route("/addfriend/:userID/:friendID").put(async (req, res) => {
  let UserID = req.params.userID;
  let FriendID = req.params.friendID;

  try {
    const result = await User.findOneAndUpdate(
      {_id: UserID},
      {$push: {Friends : FriendID}}
    );
    res.status(200).send({status: "Friend Added successfully"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});


//Remove Friend
//URL --> http://localhost:8070/user/removefriend/:userID/:friendID
router.route("/removefriend/:userID/:friendID").delete(async (req, res) => {

  let UserID = req.params.userID;
  let FriendID = req.params.friendID;
  try {
    const result = await User.findOneAndUpdate(
      {_id: UserID},
      {$pull: {Friends: FriendID}}
    );
    res.status(200).send({status: "Unfriend Successful!"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});


//Add a friend request
//URL -->http://localhost:8070/user/addfriendReq/:userID/:friendID
router.route("/addfriendReq/:userID/:friendID").put(async (req, res) => {
  let UserID = req.params.userID;
  let FriendID = req.params.friendID;

  try {
    const result = await User.findOneAndUpdate(
      {_id: UserID},
      {$push: {RequestedFriends : FriendID}}
    );
    res.status(200).send({status: "Friend  Request Sent successfully"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});


//Remove Requested Friend
//URL --> http://localhost:8070/user/removefriendReq/:userID/:friendID
router.route("/removefriendReq/:userID/:friendID").delete(async (req, res) => {

  let UserID = req.params.userID;
  let FriendID = req.params.friendID;
  try {
    const result = await User.findOneAndUpdate(
      {_id: UserID},
      {$pull: {RequestedFriends: FriendID}}
    );
    res.status(200).send({status: "Friend Request Deleted Successful!"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});



//Add a project to the user
//URL -->http://localhost:8070/user/addproject/:userID/:projectID
router.route("/addproject/:userID/:projectID").put(async (req, res) => {
  let UserID = req.params.userID;
  let ProjectID = req.params.projectID;

  try {
    const result = await User.findOneAndUpdate(
      {_id: UserID},
      {$push: {  Projects : ProjectID}}
    );
    res.status(200).send({status: "Project Added successfully"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});


//Remove a project to the user
//URL -->http://localhost:8070/user/removeproject/:userID/:projectID
router.route("/removeproject/:userID/:projectID").delete(async (req, res) => {
  let UserID = req.params.userID;
  let ProjectID = req.params.projectID;

  try {
    const result = await User.findOneAndUpdate(
      {_id: UserID},
      {$pull: {  Projects : ProjectID}}
    );
    res.status(200).send({status: "Project Removed successfully"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});



//Add a project Invitation to the user
//URL -->http://localhost:8070/user/addprojectInv/:userID/:projectID
router.route("/addprojectInv/:userID/:projectID").put(async (req, res) => {
  let UserID = req.params.userID;
  let ProjectID = req.params.projectID;

  try {
    const result = await User.findOneAndUpdate(
      {_id: UserID},
      {$push: {  ProjectInvitationIDs : ProjectID}}
    );
    res.status(200).send({status: "Project Invitation Added successfully"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});


//Remove a project Invitation to the user
//URL -->http://localhost:8070/user/removeprojectInv/:userID/:projectID
router.route("/removeprojectInv/:userID/:projectID").delete(async (req, res) => {
  let UserID = req.params.userID;
  let ProjectID = req.params.projectID;

  try {
    const result = await User.findOneAndUpdate(
      {_id: UserID},
      {$pull: {  ProjectInvitationIDs : ProjectID}}
    );
    res.status(200).send({status: "Project Invitation Removed successfully"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});


//Workspaces
//Add a workspace to the user
//URL -->http://localhost:8070/user/addworkspace/:userID/:workspaceID
router.route("/addworkspace/:userID/:workspaceID").put(async (req, res) => {
  let UserID = req.params.userID;
  let WorkspaceID = req.params.workspaceID;

  try {
    const result = await User.findOneAndUpdate(
      {_id: UserID},
      {$push: {  Workspaces :WorkspaceID}}
    );
    res.status(200).send({status: "Workspace Added successfully"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});


//Remove a workspace to the user
//URL -->http://localhost:8070/user/removeworkspace/:userID/:workspaceID
router.route("/removeworkspace/:userID/:workspaceID").delete(async (req, res) => {
  let UserID = req.params.userID;
  let WorkspaceID = req.params.workspaceID;

  try {
    const result = await User.findOneAndUpdate(
      {_id: UserID},
      {$pull: { Workspaces :WorkspaceID}}
    );
    res.status(200).send({status: "Workspace Removed successfully"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});



//Add a workspace Invitation to the user
//URL -->http://localhost:8070/user/addworkspaceInv/:userID/:workspaceID
router.route("/addworkspaceInv/:userID/:workspaceID").put(async (req, res) => {
  let UserID = req.params.userID;
  let WorkspaceID = req.params.workspaceID;

  try {
    const result = await User.findOneAndUpdate(
      {_id: UserID},
      {$push: { WorkSpaceInvitationIDs : WorkspaceID }}
    );
    res.status(200).send({status: "Workspace Invitation Added successfully"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});


//Remove a Workspace Invitation to the user
//URL -->http://localhost:8070/user/removeworkspaceInv/:userID/:workspaceID
router.route("/removeworkspaceInv/:userID/:workspaceID").delete(async (req, res) => {
  let UserID = req.params.userID;
  let WorkspaceID = req.params.workspaceID;

  try {
    const result = await User.findOneAndUpdate(
      {_id: UserID},
      {$pull: { WorkSpaceInvitationIDs : WorkspaceID}}
    );
    res.status(200).send({status: "Workspace Invitation Removed successfully"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});



//Check Friends Array --> Sharing models
//URL --> http://localhost:8070/user/checkFriends/:userID/:friendID

router.route("/checkFriends/:userid/:friendid").get((req, res) => {
  let UserID = req.params.userid;
  let FriendID = req.params.friendid;
  let status = false;

  User.findOne({_id:UserID}).exec((err, post) => {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < post.Friends.length; i++) {
        if (FriendID === post.Friends[i]) {
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


//Check Friend Requests Array --> Sharing models
//URL --> http://localhost:8070/user/checkFriendRequests/:userID/:friendID

router.route("/checkFriendRequests/:userid/:friendid").get((req, res) => {
  let UserID = req.params.userid;
  let FriendID = req.params.friendid;
  let status = false;

  User.findOne({_id:UserID}).exec((err, post) => {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < post.FriendsRequests.length; i++) {
        if (FriendID === post.FriendsRequests[i]) {
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


//Get all Workspace Details belongs to a User
//URL --> http://localhost:8070/user/getWorkspaceDetails/:userID
router.route("/getWorkspaceDetails/:userID").get(async (req, res) => {
  let UserID = req.params.userID;
  try {
    const result = await User.aggregate([
      {
        $match: { _id: ObjectId(UserID)},
      },
      {
        $project: {
          Workspaces: {
            $map: {
              input: "$Workspaces",
              as: "workspaceIDs",
              in: {
                $convert: {
                  input: "$$workspaceIDs",
                  to: "objectId"
                }
              }
            }
          }
        }
      },
      {
        $lookup: {
          from: "workspaces",
          localField: "Workspaces",
          foreignField: "_id",
          as: "WorkspaceDetails"
        }
      }
    ])
      res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//Get user details of the users in friend requests array
router.route("/getFriendRequestDetails/:userID").get(async (req, res) => {
  let userID = req.params.userID;
  try {
    const result = await User.aggregate([
      {
        $match: { _id: ObjectId(userID)},
      },
      {
        $project: {
          FriendsRequests: {
            $map: {
              input: "$FriendsRequests",
              as: "friendID",
              in: {
                $convert: {
                  input: "$$friendID",
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
          localField: "FriendsRequests",
          foreignField: "_id",
          as: "FriendRequestDetails"
        }
      }
    ])
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//Check User by Username --> Sonal
//URL -->http://localhost:8070/user/getUserbyUN/:userName
router.route("/getUserbyUN/:userName").get(async (req, res) => {
  let username = req.params.userName;

  const USER = await User.findOne({ Username: username })
    .then((user) => {



      if(user){
       res.json(true);
      }
      else{
        res.json(false);
      }

      }
    )
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with retrieving  user", error: err.message });
    });


});



//Remove  Friend Requested
//URL --> http://localhost:8070/user/removefriendReq/:userID/:friendID
router.route("/removefriendReqsts/:userID/:friendID").delete(async (req, res) => {

  let UserID = req.params.userID;
  let FriendID = req.params.friendID;
  try {
    const result = await User.findOneAndUpdate(
      {_id: UserID},
      {$pull: {FriendsRequests: FriendID}}
    );
    res.status(200).send({status: "Friend Request Deleted Successful!"});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});

//Get All Friends of a user
router.route("/getAllFrieds/:userID").get(async (req, res) => {
  let userID = req.params.userID;
  try {
    const result = await User.aggregate([
      {
        $match: { _id: ObjectId(userID)},
      },
      {
        $project: {
          Friends: {
            $map: {
              input: "$Friends",
              as: "friends",
              in: {
                $convert: {
                  input: "$$friends",
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
          localField: "Friends",
          foreignField: "_id",
          as: "AllFriends"
        }
      }
    ])
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
