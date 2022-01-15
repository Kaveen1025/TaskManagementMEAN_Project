import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FriendspageService} from "../../services/friendspage.service";


@Component({
  selector: 'app-friendrequest',
  templateUrl: './friendrequest.component.html',
  styleUrls: ['./friendrequest.component.css']
})
export class FriendrequestComponent implements OnInit {

  @Output() setEvent = new EventEmitter();


  // @ts-ignore
  userID: string = "61d458c91d0655dd1358454a";
  noofGroups: number = 5;
  profileImage: string = "";
  name: string = "";
  friendID: string = "";
  friendComponent: any;

  friendspageService : FriendspageService;
  constructor(friendspageService : FriendspageService) {
    this.friendspageService = friendspageService;
  }

  @Input() requestDetails: any;



  ngOnInit(): void {
    console.log(this.requestDetails);
    this.profileImage = this.requestDetails.ProfileImage;
    this.name = this.requestDetails.FirstName;
    this.friendID = this.requestDetails._id;


  }

  requestAccept() {
    this.friendspageService.addFriendToUser(this.userID, this.friendID).subscribe((post: any)=> {
      alert("Request accepted")
      this.friendspageService.deleteFriendRequest(this.userID, this.friendID).subscribe((post: any)=> {
          this.setEvent.emit(null)
      }, error => {
        console.log(error);
      });



    }, error => {
      console.log(error);
    });

  }

  requestDecline() {
    this.friendspageService.deleteFriendRequest(this.userID, this.friendID).subscribe((post: any)=> {
      alert("Request Cancelled")
      console.log("Request cancelled")

      this.setEvent.emit(null)

    }, error => {
      console.log(error);
    });
  }

}
