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
      // console.log(this.friendRequestObject)
      if(this.friendRequestObject[0].FriendRequestDetails.length < 1){
        this.errorvalue = true;
        this.flagContent = false

      }else {
        // this.errorvalue = true;
        this.errorvalue = false;
        this.flagContent = true
        this.friendRequest = this.friendRequestObject[0].FriendRequestDetails
      }

      // this.projectObject = post;
      // this.projectObjectConstant = this.projectObject[0].Projects;
      // this.projects = this.projectObject[0].Projects;
      // console.log("Project Details")
      // console.log(this.friendRequest);

    }, error => {
      console.log(error);
    });

  }

  searchRequests(searchtext: string){
    // alert(searchtext);
    console.log("aaa")

    console.log(this.friendRequestObjectConstant[0].FriendRequestDetails)


    let searchResult = this.friendRequestObjectConstant[0].FriendRequestDetails.filter(
      (post: { FirstName: any; }) =>
        post.FirstName.toLowerCase().includes(searchtext.toLowerCase())
    );

    if(searchResult.length >0){
      // console.log("Return array")
      // console.log(searchResult)
      this.friendRequest = searchResult;
      this.errorvalue = false;
      this.flagContent = true
    }else{
      this.friendRequest = [];
      this.errorvalue = true;
      this.flagContent = false
    }

  }

}
