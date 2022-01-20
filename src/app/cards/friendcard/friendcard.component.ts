import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {FriendspageService} from "../../services/friendspage.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-friendcard',
  templateUrl: './friendcard.component.html',
  styleUrls: ['./friendcard.component.css']
})
export class FriendcardComponent implements OnInit {

  constructor(friendspageService : FriendspageService, private db: AngularFireDatabase, private storage: AngularFireStorage, private modalService: NgbModal,) {
    this.friendspageService = friendspageService;

  }

  @Input() friendDetails: any;
  friendspageService : FriendspageService;
  @ViewChild('cancelModal1', {static: true}) cancelModal1: TemplateRef<any> | undefined


  @Output() setEvent = new EventEmitter();

  userID: string = "61d458c91d0655dd1358454a";
  userProfilePlaceholder: string = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/userPlaceHolder.png"

  noofGroups: number = 5;
  profileImage: string = "";
  name: string = "";
  friendID: string = "";




  ngOnInit(): void {
    console.log(this.friendDetails);
    this.profileImage = this.userProfilePlaceholder;
    this.name = this.friendDetails.FirstName;
    this.friendID = this.friendDetails._id;

    this.getProfileImage(this.friendDetails.ProfileImage)
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

  removeFriend() {
    this.friendspageService.removeFriend(this.friendID, this.userID).subscribe((post: any)=> {
      this.friendspageService.removeFriend(this.userID, this.friendID).subscribe((post: any)=> {
        this.setEvent.emit(null)
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }



  cancelModalDisplay() {
      this.modalService.open(this.cancelModal1, { centered: true, size : "lg", backdrop: "static"});
  }

}
