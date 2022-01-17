import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  @Input() newItemEvent: any;
  UserService:UserService
  user: any
  userID: String
  userImagePlaceHolder: String = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/userPlaceHolder.png"
  userProfileImage:any
  @ViewChild('content99') private content99: TemplateRef<any> | undefined;
  constructor(UserService:UserService, private modalService: NgbModal, private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.userID = "61d59e7999dc1f31177898ba"
    this.UserService = UserService
    this.userProfileImage = this.userImagePlaceHolder
  }

  ngOnInit(): void {
    this.getUser()
  }
  getUser(){
    this.UserService.getUser(this.userID).subscribe({
      next:value=>
      {
        this.user = value
        this.getUserProfileImage(this.user.ProfileImage)
      }
      ,
      error:error => {
        console.log(error)
      }
    } )
  }

  openUserImageEditModal() {
    this.modalService.open(this.content99, { centered: true,backdrop:'static' });
  }

 getUserProfileImage(url:any){
    this.userProfileImage = this.userImagePlaceHolder
      const storageRef = this.storage.ref(url);
       storageRef.getDownloadURL().subscribe(downloadURL => {
        this.userProfileImage = this.userImagePlaceHolder
        this.userProfileImage = downloadURL
      })
    }



}
