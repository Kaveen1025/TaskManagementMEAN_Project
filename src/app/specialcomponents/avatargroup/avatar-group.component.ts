import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar-group',
  templateUrl: './avatar-group.component.html',
  styleUrls: ['./avatar-group.component.css']
})
export class AvatarGroupComponent implements OnInit {

  avatarArray:any[]
  i:String
  textAvatarElement:boolean;
  constructor() {
    this.avatarArray = ["1","2","3","4","5","6","7","8","9","10"]
    this.i = ""
    this.textAvatarElement = true
  }

  ngOnInit(): void {
    if(this.avatarArray.length >= 5){
      this.i = '+' + String(this.avatarArray.length - 5)
      this.avatarArray = this.avatarArray.splice(0,5)
      this.textAvatarElement = false
    }
  }

}
