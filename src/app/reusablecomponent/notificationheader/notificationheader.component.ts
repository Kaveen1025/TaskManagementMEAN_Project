import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notificationheader',
  templateUrl: './notificationheader.component.html',
  styleUrls: ['./notificationheader.component.css']
})
export class NotificationheaderComponent implements OnInit {

  @Input() headertext1: any | undefined;
  @Input() headertext2: any | undefined
  @Input() headertext3: any | undefined

  msg: string ="";
  getMsgFromBaby($event: any) {this.msg = $event;

    console.log(this.msg);
  }

  constructor() { }

  ngOnInit(): void {

  }

}
