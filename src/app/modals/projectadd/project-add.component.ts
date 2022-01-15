import {Component, OnInit, TemplateRef, ViewChild, Output,Input, EventEmitter} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProjectsService} from "../../services/projects/projects.service";
import {WorkspaceservicesService} from "../../services/workspaces/workspaceservices.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-projectadd',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {

  //Attributes
  projectID : String = "";
  projectName : String ="";
  Description : String ="";
  Deadline: String ="";
  CoverImage : String ="";
  MainImage: String ="";
  AdminID: any = localStorage.getItem("AdminID");
  data:any;


  // accessing the template
  @ViewChild('content') private content: TemplateRef<any> | undefined;

  @Output() reRenderDetails = new EventEmitter<string>();

  @Input() WorkSpaceID: any;

  constructor(private modalService: NgbModal, private projectservices:ProjectsService, private userservice:UserService, private workspaceservice:WorkspaceservicesService) { }

  ngOnInit(): void {
    localStorage.setItem("AdminID","61dd30e3dd092e9def37e4b5");
  }


  closeModal() {
    this.modalService.dismissAll();
  }

  saveDetails(content: any) {
    this.modalService.dismissAll(content);
  }

  addProject(){

    let project ={
      projectName : this.projectName,
      Description : this.Description,
      Deadline: this.Deadline,
      CoverImage : this.CoverImage,
      MainImage: this.MainImage,
      AdminID : this.AdminID,
      workspaceID : this.WorkSpaceID
    }

    console.log (project);

    //Add Project to Projects
    this.projectservices.addProject(project).subscribe((res)=>{
      console.log(res);
      console.log(this.projectName);

      //Get Project ID by passing project name
      this.projectservices.fetchProjectbyName(this.projectName).subscribe((res) =>{
        console.log(res);
       this.data = res;
       this.projectID = this.data._id;
       console.log("Project ID" + this.projectID);

       //Add project to Workspace
       this.workspaceservice.addProject(this.WorkSpaceID, this.projectID).subscribe((res) => {
         console.log(res);

         //Add project to User
         this.userservice.addProject(this.AdminID, this.projectID).subscribe((res) => {
           console.log(res);

           this.closeModal();
           this.reRenderDetails.emit();
           this.modalService.open(this.content, { centered: true }, );


         })
       })

      })


    })


  }
}
