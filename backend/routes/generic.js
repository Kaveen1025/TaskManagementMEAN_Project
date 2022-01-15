const axios = require('axios');
const router = require("express").Router();

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



 async function makeRequests(requestArr){

  let senderName = "";
  let workspaceName = "";

  let RequestArr = [];


     for  (let i = 0; i < requestArr.length ; i++){

  await axios.get("http://localhost:8070/user/get/" + requestArr[i].sendersID).then((res) => {

     senderName = res.data.FirstName;
     // console.log(senderName);

     axios.get("http://localhost:8070/workspace/getWorkspaceByID/" + requestArr[i].workspaceID).then((res) => {

       workspaceName = res.data.WorkspaceName;

       let request = {
         sender: senderName,
         workspace: workspaceName
       }

       console.log(request);
       RequestArr.push(request);

       if (i == (requestArr.length - 1)) {
         console.log("ASD");
         console.log(RequestArr);

       }


     }).catch((err) => {

       console.log(err);
     })

   })

  }


}


// add the code below
module.exports = {getUserDetails };
module.exports = {makeRequests};
