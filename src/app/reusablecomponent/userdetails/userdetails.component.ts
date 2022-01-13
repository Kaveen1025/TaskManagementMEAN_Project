import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormControl} from "@angular/forms";

import {DeletedmodalComponent} from "../../modals/deletedmodal/deletedmodal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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

  constructor(UserService:UserService,private modalService: NgbModal) {
    this.userID = "61d59e7999dc1f31177898ba"
    this.UserService = UserService
    this.editableStatus = false
    this.editableStatus1 = false
    this.editableStatus2 = false
  }


  ngOnInit(): void {
    this.getUser()
  }
  getUser(){
    if (this.userID != null) {
      this.UserService.getUser(this.userID).subscribe({
        next: value => {
          this.user = value
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
    console.log(this.firstNameField)
    console.log(this.lastNameField)
    let content:any

    if(this.firstNameField == "" && this.lastNameField == ""){
      content = {
        FirstName : this.user.FirstName,
        LastName : this.user.LastName,
        ProfileImage : this.user.ProfileImage
      }
    }else
    if(this.firstNameField == ""){
       content = {
        FirstName : this.user.FirstName,
        LastName : this.lastNameField,
        ProfileImage : this.user.ProfileImage
      }
    }else if(this.lastNameField == ""){
      content = {
        FirstName : this.firstNameField,
        LastName : this.user.LastName,
        ProfileImage : this.user.ProfileImage
      }
    }else{
      content = {
        FirstName : this.firstNameField,
        LastName : this.lastNameField,
        ProfileImage : this.user.ProfileImage
      }
    }


    if (this.userID != null) {
      await this.UserService.updateUserDetails(this.userID, content).subscribe({
        next: value => {
          alert("user updated")
          this.cancel()
        }
        ,
        error: error => {
          console.log(error)
        }
      })
    }

  }




  /// modal
  deleteAccount() {
    this.modalService.open(this.content, { centered: true });
  }

  hello(event: any){
    alert(event.myObj)
  }


}
