import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-activitycard',
  templateUrl: './activitycard.component.html',
  styleUrls: ['./activitycard.component.css']
})
export class ActivitycardComponent implements OnInit {

  @Input() cardTitle: string | undefined
  @Input() collapseID: string | undefined
  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
  }

}
