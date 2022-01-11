import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  @Input() newItemEvent: any;

  constructor() { }

  ngOnInit(): void {
  }

}
