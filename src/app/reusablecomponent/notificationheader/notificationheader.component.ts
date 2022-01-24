import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-notificationheader',
  templateUrl: './notificationheader.component.html',
  styleUrls: ['./notificationheader.component.css']
})
export class NotificationheaderComponent implements OnInit {

  @Input() headertext1: any | undefined;
  @Input() headertext2: any | undefined
  @Input() headertext3: any | undefined

  @Output() searchInput = new EventEmitter<any>();

  msg: string ="";
  getMsgFromBaby($event: any) {this.msg = $event;

    // console.log(this.msg);
    this.searchInput.emit(this.msg);
  }

  @Output() searchContext = new EventEmitter<string>();
  searchText: string = ""

  constructor() { }

  ngOnInit(): void {

  }

  searchProjects(){
    this.searchContext.emit(this.searchText);
  }



}
