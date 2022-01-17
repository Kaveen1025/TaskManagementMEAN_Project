import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-acceptordeclinebtn',
  templateUrl: './acceptordeclinebtn.component.html',
  styleUrls: ['./acceptordeclinebtn.component.css']
})
export class AcceptordeclinebtnComponent implements OnInit {


  // @ts-ignore
  @Input() text: string | undefined;
  @Output() btnClick = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  // onClick(text: string){
  //   if(this.btnText == "Accept"){
  //     alert("Accepted");
  //   }else if(this.btnText == "Decline"){
  //     alert("Declined");
  //
  //   }
  //
  // }

  onClick(){
    this.btnClick.emit();
  }
}
