import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friendrequest',
  templateUrl: './friendrequest.component.html',
  styleUrls: ['./friendrequest.component.css']
})
export class FriendrequestComponent implements OnInit {

  // @ts-ignore
  noofGroups: number = 5;

  constructor() { }

  ngOnInit(): void {
  }

  requestAccept() {
    alert("Request accepted")
  }

  requestDecline() {
    alert("Request declined")
  }

}
