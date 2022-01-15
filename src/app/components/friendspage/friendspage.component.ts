import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FriendspageService} from "../../services/friendspage.service";

@Component({
  selector: 'app-friendspage',
  templateUrl: './friendspage.component.html',
  styleUrls: ['./friendspage.component.css']
})
export class FriendspageComponent implements OnInit {


  requestArray:any[]
  userID: string = "61d458c91d0655dd1358454a"
  friendRequest: any[] = [{}];
  friendRequestObject: any = {};
  friendRequestObjectConstant: any[] = [{}];
  errorvalue = false;
  flagContent = false

  friendspageService : FriendspageService;
  constructor(friendspageService : FriendspageService) {
    this.requestArray = ["1","2","3","4","5","6","7","8","9","10"]
    this.friendspageService = friendspageService;
  }

  ngOnInit(): void {
    this.getAllUserRequests()
  }



  getAllUserRequests(){
    this.friendspageService.getAllUsers(this.userID).subscribe((post: any)=> {
      this.friendRequestObject = post;
      this.friendRequestObjectConstant = post;

      if(this.friendRequestObject[0].RequestedFriendDetails.length < 1){
        this.errorvalue = true;
        this.flagContent = false

      }else {
        // this.errorvalue = true;
        this.errorvalue = false;
        this.flagContent = true
        this.friendRequest = this.friendRequestObject[0].RequestedFriendDetails
      }
      console.log(this.friendRequestObjectConstant)
      console.log(this.friendRequest.length)

      // this.projectObject = post;
      // this.projectObjectConstant = this.projectObject[0].Projects;
      // this.projects = this.projectObject[0].Projects;
      // console.log("Project Details")
      // console.log(this.friendRequest);

    }, error => {
      console.log(error);
    });

  }

}
