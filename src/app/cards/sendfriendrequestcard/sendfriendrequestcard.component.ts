import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";

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
  userProfilePlaceholder: string = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/userPlaceHolder.png"
  profileImage: string = "";


  userArray:any[]

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
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

  getProfileImage(url:any){
    // alert("asd")
    // this.profileImage = this.userProfilePlaceholder
    // const storageRef = this.storage.ref(url);
    // storageRef.getDownloadURL().subscribe(downloadURL => {
    //   this.profileImage = this.userProfilePlaceholder
    //   this.profileImage = downloadURL
    //   console.log("work")
    //   console.log(this.userProfilePlaceholder)
    //
    // })
  }

}
