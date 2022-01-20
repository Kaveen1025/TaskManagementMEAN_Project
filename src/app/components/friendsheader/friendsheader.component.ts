import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-friendsheader',
  templateUrl: './friendsheader.component.html',
  styleUrls: ['./friendsheader.component.css']
})
export class FriendsheaderComponent implements OnInit {

  @Input() noOfFriends: any
  @Output() searchContext = new EventEmitter<string>();
  searchText: string = ""

  headertext1: string = "Your Friends"
  ngOnInit() {

  }

  searchProjects(){
    this.searchContext.emit(this.searchText);
  }





}
