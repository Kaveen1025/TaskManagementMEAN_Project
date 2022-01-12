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




  projects: any[] = [{}];
  projectObject: any = {};
  projectObjectConstant: any[] = [{}];
  numbers:  any[] = ["2","3","4","5","6","7","8","9","10"];
  workspaceID = "61d448976fc2f6cc55b25ca5";
  noOfProjects: string = "";
  noOfMembers: string = "";
  noOfGuests: string = "";
  workspaceTitle: string = "";
  workspaceDescription: string = "";
  workspaceCoverImage: string = "";
  workspaceMainImage: string = "";
  workspaceModal : any;
  errorText: string = ""

  searchText: string = ""

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
      this.projectObjectConstant = this.projectObject[0].Projects;
      this.projects = this.projectObject[0].Projects;
      // console.log("Project Details")
      // console.log(this.projectObject[0]);

    }, error => {
      console.log(error);
    });

  }
  getWorkspaceDetails(){
    this.workspaceService.getWorkspaceData(this.workspaceID).subscribe((post: any)=> {
      console.log("Project Details")
      this.noOfMembers = post.MemberIDs.length
      this.noOfProjects = post.ProjectIDs.length
      this.noOfGuests = post.guestIDs.length
      this.workspaceTitle = post.WorkspaceName;
      this.workspaceCoverImage = post.CoverImage;
      this.workspaceMainImage = post.MainImage;
      this.workspaceDescription = post.Description;

    }, error => {
      console.log(error);
    });
  }

  getData(){
    this.workspaceModal.openVerticallyCentered(this.projects);
  }

  searchProjects(){
    let i: number = 0

      let searchResult = this.projectObjectConstant.filter(
        (post) =>
          post.projectName.toLowerCase().includes(this.searchText.toLowerCase())
      );

      if(searchResult.length >0){
        console.log("Return array")
        console.log(searchResult)
        this.projects = searchResult;
        this.errorText = ""
      }else{
        this.projects = [];
        this.errorText = "No Projects available"
      }

      }





}
