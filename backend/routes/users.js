//users route

//Imports
const router = require("express").Router();
let User = require("../models/user");
const bcrypt = require("bcryptjs");

// import getUserDetails from "./generic";
const generic = require('./generic');
const Workspace = require("../models/workspace");


//Add user --> Signup Page
//URL -- >http://localhost:8070/user/add
router.route("/add").post(async(req,res)=>{

  const{
    Username,
    Email,
    FirstName,
    LastName,
    Password
  }= req.body;

  try{
    //Verify whether email or the username already exists
    const emailExist = await User.findOne({ Email: Email });

    if (emailExist) {
      return res.status(422).json({ error: "Email Already Exist" });
    }

    const usernameExist = await User.findOne({ Username: Username });

    if (usernameExist) {
      return res.status(422).json({ error: "Username Already Exist" });
    }

    const newUser = new User({
      Username,
      Email,
      FirstName,
      LastName,
      Password
    })

    await newUser.save();
    res.status(201).json({ message: "User Added Successfully!" });

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

//Update User --> Edit Profile Page
//URL --> http://localhost:8070/user/update/:id
router.route('/update/:id').put(async (req,res)=> {

    let userID = req.params.id;

  const {FirstName, LastName, ProfileImage} = req.body;

    const updatedUser = await User.updateOne(
      {_id: userID},
      {
        $set:{
          FirstName: FirstName,
          LastName : LastName,
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
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        res.json({message: "Customer Sign In Successfully"});

      }
    } else {
      res.status(400).json({ error: "User does not exists" });
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


//Remove Friend Request
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
//URL -->http://localhost:8070/user/addproject/:userID/:friendID
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
//URL -->http://localhost:8070/user/removeproject/:userID/:friendID
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
//URL -->http://localhost:8070/user/addprojectInv/:userID/:friendID
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


//Remove a project to the user
//URL -->http://localhost:8070/user/removeprojectInv/:userID/:friendID
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


//Get all Members belongs to a single workspace
router.route("/getMemberDetails/:workspaceID").get(async (req, res) => {
  let workspaceID = req.params.workspaceID;
  try {
    const result = await Workspace.aggregate([
      {
        $match: { _id: ObjectId(workspaceID)},
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





module.exports = router;
