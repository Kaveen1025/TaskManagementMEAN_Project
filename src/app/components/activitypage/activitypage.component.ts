import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-activitypage',
  templateUrl: './activitypage.component.html',
  styleUrls: ['./activitypage.component.css']
})
export class ActivitypageComponent implements OnInit {

  // btnTxt=""
  @Input() btnTxt: string ="MAXIMIZE";

  workspaceID = "61d448976fc2f6cc55b25ca5";
  // workspaceID: any;
  // hide1 = true;
  hide2: boolean = false;
  hide1: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  max(){
    // alert("clicked")
    this.btnTxt = "MINIMIZE"
    this.hide1 = false;
    this.hide2 = true;
  }

}
