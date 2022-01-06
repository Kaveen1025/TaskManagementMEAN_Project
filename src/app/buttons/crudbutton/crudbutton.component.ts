import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-crudbutton',
  templateUrl: './crudbutton.component.html',
  styleUrls: ['./crudbutton.component.css']
})
export class CrudbuttonComponent implements OnInit {

  @Input() text: string | undefined;
  @Input() color: string | undefined;
  @Output() btnClick = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    console.log("Clicked")
  }

}
