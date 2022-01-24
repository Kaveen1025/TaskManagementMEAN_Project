import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() text: string | undefined;
  @Output() searchInput = new EventEmitter<any>();

  searchIn:any="";

  constructor() { }

  ngOnInit(): void {
  }

  sendUserInput(){

      // console.log("At Search Component : " + this.searchIn);
      this.searchInput.emit(this.searchIn);
  }
}
