import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>()
  @Input() userID : String | undefined

  UserService:UserService
  user: any
  editableStatus1:boolean
  editableStatus:boolean
  editableStatus2: boolean;
  constructor(UserService:UserService) {
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
  }
}
