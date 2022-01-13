import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

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
  constructor(UserService:UserService) {
    this.userID = "61d59e7999dc1f31177898ba"
    this.UserService = UserService
  }

  ngOnInit(): void {
    this.getUser()
  }
  getUser(){
    this.UserService.getUser(this.userID).subscribe({
      next:value=>
      {
        this.user = value
      }
      ,
      error:error => {
        console.log(error)
      }
    } )
  }
}
