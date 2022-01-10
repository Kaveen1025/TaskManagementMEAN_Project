import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notificationheader',
  templateUrl: './notificationheader.component.html',
  styleUrls: ['./notificationheader.component.css']
})
export class NotificationheaderComponent implements OnInit {

  @Input() headertext1: string | undefined;
  @Input() headertext2: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
