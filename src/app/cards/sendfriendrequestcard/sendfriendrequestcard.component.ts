import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-sendfriendrequestcard',
  templateUrl: './sendfriendrequestcard.component.html',
  styleUrls: ['./sendfriendrequestcard.component.css']
})
export class SendfriendrequestcardComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  // @ts-ignore
  filteredOptions: Observable<string[]>;

  userArray:any[]

  constructor() {
    this.userArray = ["1","2","3","4","5","6","7","8","9","10"]
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
