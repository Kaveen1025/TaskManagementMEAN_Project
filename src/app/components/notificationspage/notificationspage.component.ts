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
  workduplicate:any = [];
  projectinvitations:any = [];
  projectduplicate:any = [];

  TypeP : string = "Project";
  TypeW : string = "Workspace";

  count : number =0;

  HeaderType : string ="Notifications";
  HeaderType2 : string ="notifications";
  msg: string ="";

  constructor(private workspaceinvService: WorkspaceinvService, private projectinvService: ProjectinvService) { }

  ngOnInit(): void {
    this.fetchDetails();
    console.log("Final Count : " + this.count);
  }



  getMsgFromBaby($event: any) {this.msg = $event;

    console.log(this.msg);
    this.filter(this.msg);
  }

  filter(searchIn:string){

    let searchResultW = this.workduplicate.filter(
      (post: { WorkspaceName: any; SenderName:any; }) =>
        post.WorkspaceName.toLowerCase().includes(searchIn.toLowerCase()) ||  post.SenderName.toLowerCase().includes(searchIn.toLowerCase())
    );


    let searchResultP = this.projectduplicate.filter(
      (post: { ProjectName: any; SenderName:any; }) =>
        post.ProjectName.toLowerCase().includes(searchIn.toLowerCase()) ||  post.SenderName.toLowerCase().includes(searchIn.toLowerCase())
    );

    // console.log(searchResultW);
    // console.log(searchResultP);

    this.workspaceinvitations =searchResultW;
    this.projectinvitations = searchResultP;
    //
    // if(searchResultW.length === 0 && searchResultP === 0){
    //   console.log("Mukuth Na Ithin");
    //   // this.fetchDetails();
    // }
    // else{
    //   this.workspaceinvitations =searchResultW;
    //   this.projectinvitations = searchResultP;
    // }
    //
    // if(searchResultP.length > 0){
    //     this.projectinvitations = searchResultP;
    //     this.workspaceinvitations =searchResultW;
    // }
    // else if(searchResultW.length > 0){
    //   this.projectinvitations = searchResultP;
    //   this.workspaceinvitations =searchResultW;
    // }
  }









  fetchDetails(){
    this.workspaceinvService.fetchInvitations(this.UserID).subscribe((res) => {

      this.workspaceinvitations = res;
      this.workduplicate =res;
      this.count += this.workspaceinvitations.length;
      console.log("Count at W : " + this.count);

      this.projectinvService.fetchInvitations(this.UserID).subscribe((res)=>{
        this.projectinvitations =res;
        this.projectduplicate = res;
        this.count += this.projectinvitations.length;
        console.log("Count at P : " + this.count);

      })

    })

  }


}
