//Contact Us Router

//Imports
const router = require("express").Router();
let ContactUs = require("../models/contactUs");
const User = require("../models/user");


//Add --> Contact Us Page
//URL --> http://localhost:8070/contactus/add
router.route("/add").post((req, res) => {

  const  {
    firstName,
      lastName,
      email,
      phoneNumber,
      message
  } = req.body;

  const newContactUS = new ContactUs({
    firstName,
    lastName,
    email,
    phoneNumber,
    message
  })


  newContactUS.save().then(() => {
    res.json("Contact Ud Added Successfully");
  })
    .catch((err) => {
      console.log(err);
      res.status(404).json({message: error.message});
    });
})


//Get All Contact Us
//URL -->  http://localhost:8070/contactus/get

router.route("/get").get((req, res) => {
  ContactUs.find()
    .then((contacts) => {
      res.json(contacts);
    })
    .catch((err) => {
      res.status(404).json({message: error.message});
    });


})
module.exports = router;
