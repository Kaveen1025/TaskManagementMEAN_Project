//users route

//Imports
const router = require("express").Router();
let User = require("../models/user");

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









module.exports = router;
