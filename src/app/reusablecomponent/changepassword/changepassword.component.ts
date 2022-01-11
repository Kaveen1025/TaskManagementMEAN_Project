import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  userID:String
  constructor() {
    this.userID = "61d59e7999dc1f31177898ba"
  }

  ngOnInit(): void {
  }

  changeThePassword() {

  }
}
