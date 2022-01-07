import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-mainmodal',
  templateUrl: './mainmodal.component.html',
  styleUrls: ['./mainmodal.component.css']
})
export class MainmodalComponent implements OnInit {

  @Input() text: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
