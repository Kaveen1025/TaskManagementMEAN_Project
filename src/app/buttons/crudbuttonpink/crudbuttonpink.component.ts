import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-crudbuttonpink',
  templateUrl: './crudbuttonpink.component.html',
  styleUrls: ['./crudbuttonpink.component.css']
})
export class CrudbuttonpinkComponent implements OnInit {
  @Input() text: string | undefined;
  @Input() color: string | undefined;
  @Output() btnClick = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.btnClick.emit();
  }
}
