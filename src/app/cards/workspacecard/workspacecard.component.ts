import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-workspacecard',
  templateUrl: './workspacecard.component.html',
  styleUrls: ['./workspacecard.component.css']
})
export class WorkspacecardComponent implements OnInit {

  @Input() workSpaceName: string | undefined;
  @Input() description: string | undefined;
  @Input() mainImage: string | undefined;
  @Input() coverImage: string | undefined;
  @Input() members: string | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
