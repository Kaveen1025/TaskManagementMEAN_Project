import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {WorkspaceService} from "../../services/workspacepage.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


import {WorkspaceeditComponent} from "./../../modals/workspaceedit/workspaceedit.component";

@Component({
  selector: 'app-workspacepage',
  templateUrl: './workspacepage.component.html',
  styleUrls: ['./workspacepage.component.css']
})
export class WorkspacepageComponent implements OnInit {


  @Output() setProjects = new EventEmitter();




  projects: Object[] = [{}];
  projectObject: any = {};
  numbers:  any[] = ["2","3","4","5","6","7","8","9","10"];
  workspaceID = "61d448976fc2f6cc55b25ca5";
  noOfProjects: string = "";
  noOfMembers: string = "";
  noOfGuests: string = "";
  workspaceModal : any;

  async ngOnInit(): Promise<void> {
    await this.getProjectDetails();
    await this.getWorkspaceDetails()
    this.workspaceModal = new WorkspaceeditComponent(this.modalService)
  }







  workspaceService : WorkspaceService;

  constructor(workspaceService : WorkspaceService, private modalService: NgbModal) {
    this.workspaceService = workspaceService;
  }



  getProjectDetails(){
    this.workspaceService.getAllProjects(this.workspaceID).subscribe((post: any)=> {
      this.projectObject = post;
      this.projects = this.projectObject[0].Projects;
      // console.log("Project Details")
      // console.log(this.projectObject[0]);

    });

  }
  getWorkspaceDetails(){
    this.workspaceService.getWorkspaceData(this.workspaceID).subscribe((post: any)=> {
      console.log("Project Details")
      this.noOfMembers = post.MemberIDs.length
      this.noOfProjects = post.ProjectIDs.length
      this.noOfGuests = post.guestIDs.length

    });
  }

  getData(){
    this.workspaceModal.openVerticallyCentered(this.projects);
  }


}
