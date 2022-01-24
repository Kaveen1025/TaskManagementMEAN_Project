import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {ProjectsService} from "../../services/projects/projects.service";
import {ProjectinvService} from "../../services/projectinvitations/projectinv.service";

@Component({
  selector: 'app-sharetest',
  templateUrl: './sharetest.component.html',
  styleUrls: ['./sharetest.component.css']
})
export class SharetestComponent implements OnInit {

  usersArray:any = [];
  FinalArray:any = [];
  projectID:any = "61d6ff1e8bea25059fb92c45";

  constructor(private userservice:UserService, private projectservice:ProjectsService, private projectInvservice: ProjectinvService) { }

  async ngOnInit(): Promise<void> {
    await this.getUsers();
    // this.rockets(this.usersArray);
    console.log(this.FinalArray);

  }


 async getUsers(){

    await this.userservice.getAllUsers().subscribe({
      next : users =>{

        this.usersArray = users;

        console.log(this.usersArray);
        // this.checkMembers(this.usersArray);
        // this.CheckProjectMembers(this.usersArray);
        // this.CheckProjectInvMembers(this.usersArray);

        for(let i = 0; i<= this.usersArray.length; i++){

          let c1 = 0;
          let c2 = 0;

          for( let j = 0; j <= this.usersArray[i].Projects.length; j++){

            if(this.usersArray[i].Projects[j] === this.projectID){
              let Object = {

                id:this.usersArray[i]._id,
                firstname:this.usersArray[i].FirstName,
                lastname:this.usersArray[i].LastName,
                image:this.usersArray[i].ProfileImage,
                icon:"Green Dot",
                email :this.usersArray[i].Email

              }

              this.FinalArray.push(Object);

              break;


            }

            c1 = c1 +1;
          }


          for(  let k = 0; k <= this.usersArray[i].ProjectInvitationIDs.length; k++){

            if(this.usersArray[i].ProjectInvitationIDs[k] === this.projectID){
              let Object = {

                id:this.usersArray[i]._id,
                firstname:this.usersArray[i].FirstName,
                lastname:this.usersArray[i].LastName,
                image:this.usersArray[i].ProfileImage,
                icon:"Clock Icon",
                email :this.usersArray[i].Email

              }

              this.FinalArray.push(Object);

              break;


            }

            c2 = c2 +1;
          }




            // console.log(c1 == (this.usersArray[i].Projects.length -1 ) );

          if(c1 >= (this.usersArray[i].Projects.length) && c2 >= (this.usersArray[i].ProjectInvitationIDs.length) ){

            let Object = {

              id:this.usersArray[i]._id,
              firstname:this.usersArray[i].FirstName,
              lastname:this.usersArray[i].LastName,
              image:this.usersArray[i].ProfileImage,
              icon:"Rocket",
              email :this.usersArray[i].Email

            }

            this.FinalArray.push(Object);

          }


        }



      },
      error:err => {
        console.log(err);
      }
    })
  }




}






