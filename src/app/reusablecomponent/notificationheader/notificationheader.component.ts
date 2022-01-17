import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-notificationheader',
  templateUrl: './notificationheader.component.html',
  styleUrls: ['./notificationheader.component.css']
})
export class NotificationheaderComponent implements OnInit {

  @Input() headertext1: string | undefined;
  @Input() headertext2: string | undefined;

  @Output() searchContext = new EventEmitter<string>();
  searchText: string = ""

  constructor() { }

  ngOnInit(): void {
  }

  searchProjects(){
    this.searchContext.emit(this.searchText);
  }



}
