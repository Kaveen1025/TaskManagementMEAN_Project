import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-friendsheader',
  templateUrl: './friendsheader.component.html',
  styleUrls: ['./friendsheader.component.css']
})
export class FriendsheaderComponent implements OnInit {
  totFriends: number =  50;

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  // @ts-ignore
  filteredOptions: Observable<string[]>;

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
