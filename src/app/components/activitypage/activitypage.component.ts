import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-activitypage',
  templateUrl: './activitypage.component.html',
  styleUrls: ['./activitypage.component.css']
})
export class ActivitypageComponent implements OnInit {

  // btnTxt=""
  @Input() btnTxt: string ="MINIMIZE";

  workspaceID = "61d448976fc2f6cc55b25ca5";

  hide2: boolean = false;
  hide1: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  max(){

    if(this.btnTxt=="MAXIMIZE"){
      this.btnTxt = "MINIMIZE"
      this.hide1 = true;
      this.hide2 = false;
    }
    else{
      this.btnTxt = "MAXIMIZE"
      this.hide1 = false;
      this.hide2 = true;
    }

    //btn shadow
  }

}
