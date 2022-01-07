import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clearall',
  templateUrl: './clearall.component.html',
  styleUrls: ['./clearall.component.css']
})
export class ClearallComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    alert("All cleared")
  }

}
