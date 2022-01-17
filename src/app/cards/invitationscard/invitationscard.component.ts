import { Component, OnInit, Input } from '@angular/core';
import {WorkspaceinvService} from "../../services/workspaceinvitations/workspaceinv.service";


@Component({
  selector: 'app-invitationscard',
  templateUrl: './invitationscard.component.html',
  styleUrls: ['./invitationscard.component.css']
})
export class InvitationscardComponent implements OnInit {

  @Input() Sender: any;
  @Input() Workspace: any;
  @Input() Image: any;

  constructor(private workspaceinvService: WorkspaceinvService) { }

  ngOnInit(): void {
  }


}
