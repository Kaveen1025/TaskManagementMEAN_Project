import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friendcard',
  templateUrl: './friendcard.component.html',
  styleUrls: ['./friendcard.component.css']
})
export class FriendcardComponent implements OnInit {

  constructor() { }

  noofGroups: number = 5;

  ngOnInit(): void {
  }

  removeFriend() {
    alert("Friend removed successfully")
  }


}
