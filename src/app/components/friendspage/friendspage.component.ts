import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friendspage',
  templateUrl: './friendspage.component.html',
  styleUrls: ['./friendspage.component.css']
})
export class FriendspageComponent implements OnInit {

  requestArray:any[]

  constructor() {
    this.requestArray = ["1","2","3","4","5","6","7","8","9","10"]
  }

  ngOnInit(): void {
  }

}
