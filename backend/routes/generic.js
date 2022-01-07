const axios = require('axios');

//Fetch user details according to the friends array
async function getUserDetails(idArray){

  let UserDetails = [];
  for (let i = 0; i < idArray.length; i++){

    await axios.get("http://localhost:8070/user/get/" + idArray[i]).then((res) => {

      // console.log("Data");
      // console.log(res.data);
      UserDetails.push(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  //  console.log ("************************ UserDetails Function in Generic ****************");
  // console.log(UserDetails);

  return UserDetails;
}


// add the code below
module.exports = {getUserDetails };
