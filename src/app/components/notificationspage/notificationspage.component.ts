import {Component, Input, OnInit} from '@angular/core';
import {WorkspaceinvService} from "../../services/workspaceinvitations/workspaceinv.service";
import {ProjectinvService} from "../../services/projectinvitations/projectinv.service";

@Component({
  selector: 'app-notificationspage',
  templateUrl: './notificationspage.component.html',
  styleUrls: ['./notificationspage.component.css']
})
export class NotificationspageComponent implements OnInit {

  @Input() UserID: any;

  workspaceinvitations:any = [];
  projectinvitations:any = [];
  TypeP : string = "Project";
  TypeW : string = "Workspace";

  count : number =0;

  HeaderType : string ="Notifications"
  HeaderType2 : string ="notifications"

  constructor(private workspaceinvService: WorkspaceinvService, private projectinvService: ProjectinvService) { }

  ngOnInit(): void {
    this.fetchDetails();
    console.log("Final Count : " + this.count);
  }

  fetchDetails(){
    this.workspaceinvService.fetchInvitations(this.UserID).subscribe((res) => {

      this.workspaceinvitations = res;
      this.count += this.workspaceinvitations.length;
      console.log("Count at W : " + this.count);

      this.projectinvService.fetchInvitations(this.UserID).subscribe((res)=>{
        this.projectinvitations =res;
        this.count += this.projectinvitations.length;
        console.log("Count at P : " + this.count);

      })

    })

  }


}
