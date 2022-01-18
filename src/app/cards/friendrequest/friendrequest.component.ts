import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FriendspageService} from "../../services/friendspage.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";


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
  userProfilePlaceholder: string = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/userPlaceHolder.png"


  friendspageService : FriendspageService;
  constructor(friendspageService : FriendspageService, private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.friendspageService = friendspageService;
  }

  @Input() requestDetails: any;



  ngOnInit(): void {
    console.log(this.requestDetails);
    this.profileImage = this.userProfilePlaceholder;
    this.name = this.requestDetails.FirstName;
    this.friendID = this.requestDetails._id;

    this.getProfileImage(this.requestDetails.ProfileImage)
  }

  requestAccept() {
    this.friendspageService.addFriendToUser(this.userID, this.friendID).subscribe((post: any)=> {
      alert("Request accepted")
      this.friendspageService.deleteFriendRequest(this.userID, this.friendID).subscribe((post: any)=> {

      }, error => {
        console.log(error);
      });

      this.friendspageService.deleteRequestedFriend(this.friendID, this.userID).subscribe((post: any)=> {
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

      this.friendspageService.deleteRequestedFriend(this.friendID, this.userID).subscribe((post: any)=> {
        this.setEvent.emit(null)

      }, error => {
        console.log(error);
      });


    }, error => {
      console.log(error);
    });
  }

  getProfileImage(url:any){
    // alert("asd")
    this.profileImage = this.userProfilePlaceholder
    const storageRef = this.storage.ref(url);
    storageRef.getDownloadURL().subscribe(downloadURL => {
      this.profileImage = this.userProfilePlaceholder
      this.profileImage = downloadURL
      console.log("work")
      console.log(this.userProfilePlaceholder)

    })
  }

}
