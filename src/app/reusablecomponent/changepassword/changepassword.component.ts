import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
// @ts-ignore
import * as bcrypt from 'bcryptjs';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  userID:String
  User:any
  UserService:UserService
  constructor(UserService:UserService) {
    this.userID = "61d59e7999dc1f31177898ba"
    this.UserService = UserService
  }

  ngOnInit(): void {
    this.getUser()
  }

  changeThePassword() {
    console.log(bcrypt.compareSync("sonal123",this.User.Password))
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
}
