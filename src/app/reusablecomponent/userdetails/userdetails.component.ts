import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormControl} from "@angular/forms";

import {DeletedmodalComponent} from "../../modals/deletedmodal/deletedmodal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>()
  @Input() userID : String | undefined
  // firstNameField = new FormControl('');
  firstNameField:any
  lastNameField:any

  UserService:UserService
  user: any
  editableStatus1:boolean
  editableStatus:boolean
  editableStatus2: boolean;


  // accessing the template
  @ViewChild('content') private content: TemplateRef<any> | undefined;
  @ViewChild('content2') private content2: TemplateRef<any> | undefined;
  @ViewChild('content3') private content3: TemplateRef<any> | undefined;
  @ViewChild('content4') private content4: TemplateRef<any> | undefined;
  @ViewChild('content5') private content5: TemplateRef<any> | undefined;
  @ViewChild('content6') private content6: TemplateRef<any> | undefined;
  timezone:any

  googleUserStatus:boolean
  constructor(UserService:UserService,private modalService: NgbModal) {
    this.userID = "61d59e7999dc1f31177898ba"
    this.UserService = UserService
    this.editableStatus = false
    this.editableStatus1 = false
    this.editableStatus2 = false
    this.googleUserStatus = false

    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }


  ngOnInit(): void {
    this.getUser()


  }
  getUser(){
    if (this.userID != null) {
      this.UserService.getUser(this.userID).subscribe({
        next: value => {
          this.user = value
          if(this.user.GoogleSignIn){
            this.googleUserStatus = true
          }
          this.firstNameField = this.user.FirstName
          this.lastNameField = this.user.LastName
        }
        ,
        error: error => {
          console.log(error)
        }
      })
    }
  }

  redirectToChangePasswordPage() {
    this.newItemEvent.emit('false')
  }

  makeEditable(which:number) {
    this.editableStatus = true
    switch (which) {
      case 0:
        this.editableStatus1 = true
        break
      case 1:
        this.editableStatus2 = true
        break
    }


  }

  cancel() {
    this.editableStatus1 = false
    this.editableStatus2 = false
    this.editableStatus = false
    this.getUser()
  }

  async updateUserDetails() {
    //console.log(this.firstNameField)
   // console.log(this.lastNameField)
    let content:any

    if(this.firstNameField == "" && this.lastNameField == ""){
      content = {
        FirstName : this.user.FirstName,
        LastName : this.user.LastName,
      }
    }else
    if(this.firstNameField == ""){
       content = {
        FirstName : this.user.FirstName,
        LastName : this.lastNameField,
      }
    }else if(this.lastNameField == ""){
      content = {
        FirstName : this.firstNameField,
        LastName : this.user.LastName,
      }
    }else{
      content = {
        FirstName : this.firstNameField,
        LastName : this.lastNameField,
      }
    }


    if (this.userID != null) {
      await this.UserService.updateUserDetails(this.userID, content).subscribe({
        next: value => {
         // alert("user updated")
          this.cancel()
          this.modalService.open(this.content3, { centered: true });
        }
        ,
        error: error => {
          console.log(error)
          this.modalService.open(this.content4, { centered: true });
        }
      })
    }

  }


openConfirmModal(){
  this.modalService.open(this.content2, { centered: true });
  }


  /// modal
  deleteAccount() {
    this.modalService.open(this.content5, { centered: true });
  }

  hello(event: any){
    alert(event.myObj)
  }


  unlinkAccount(){
    this.modalService.open(this.content6, { centered: true });
  }

  deleteAccountFromDB(){
    // this.UserService.deleteUser(this.userID).subscribe({
    //   next:value=>
    //   {
    //     // navigate to login page
    //   }
    //   ,
    //   error:error => {
    //     console.log(error)
    //     this.modalService.open(this.content4, { centered: true });
    //   }
    // } )
    // this.modalService.dismissAll(this.content);
  }

}
