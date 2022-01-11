import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
// @ts-ignore
import * as bcrypt from 'bcryptjs';
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  userID:String
  User:any
  UserService:UserService

  currentPassword = new FormControl('');
  newPassword = new FormControl('');
  confirmPassword = new FormControl('');
  wrongPassword: boolean = true;
  mismatch: boolean = true;
  constructor(UserService:UserService) {
    this.userID = "61d59e7999dc1f31177898ba"
    this.UserService = UserService
  }

  ngOnInit(): void {
    this.getUser()
  }

  changeThePassword() {
    this.wrongPassword = true
    this.mismatch = true
    if(this.checkCurrentPassword(this.currentPassword.value)){
      this.wrongPassword = true
      if(this.confirmPassword.value === this.newPassword.value) {
        this.mismatch = true
        this.UserService.changeUserPassword(this.userID,this.newPassword.value).subscribe({
          next:value=>
          {
            alert("password updated")
            this.getUser()
          }
          ,
          error:error => {
            console.log(error)
          }
        } )
      }else{
        this.mismatch = false
      }

    }else{
     this.wrongPassword = false;
    }

  }

  getUser(){
    this.UserService.getUser(this.userID).subscribe({
      next:value=>
      {
        this.User = value
      }
      ,
      error:error => {
        console.log(error)
      }
    } )
  }

  checkCurrentPassword(currentPassword:String):boolean{
   return bcrypt.compareSync(currentPassword,this.User.Password)
  }
}
