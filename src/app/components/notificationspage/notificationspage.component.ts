import {Component, Input, OnInit} from '@angular/core';
import {WorkspaceinvService} from "../../services/workspaceinvitations/workspaceinv.service";

@Component({
  selector: 'app-notificationspage',
  templateUrl: './notificationspage.component.html',
  styleUrls: ['./notificationspage.component.css']
})
export class NotificationspageComponent implements OnInit {

  @Input() UserID: any;

  workspaceinvitations:any = [];

  constructor(private workspaceinvService: WorkspaceinvService) { }

  ngOnInit(): void {
    this.fetchDetails();
  }

  fetchDetails(){
    this.workspaceinvService.fetchInvitations(this.UserID).subscribe((res) => {

      this.workspaceinvitations = res;
    })

  }
}
