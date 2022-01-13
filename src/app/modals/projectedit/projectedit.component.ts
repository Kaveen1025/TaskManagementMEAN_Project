import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import {ProjectsService} from "../../services/projects/projects.service";

@Component({
  selector: 'app-projectedit',
  templateUrl: './projectedit.component.html',
  styleUrls: ['./projectedit.component.css']
})
export class ProjecteditComponent implements OnInit {


  //Attributes
  projectName : String ="";
  Description : String ="";
  Deadline: String ="";
  CoverImage : String ="";
  MainImage: String ="";
  AdminID : String ="11111";
  workspaceID : String ="33333";
  projectID: String ="61deeaa630bf0e716bc8e74e";
  data:any;

  constructor(private modalService: NgbModal, private projectservices:ProjectsService) { }

  ngOnInit(): void {
    this.fetchProjects(this.projectID);
  }
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true, size : "lg"});
  }

  closeModal(content: any) {
    this.modalService.dismissAll(content);
  }

  saveDetails(content: any) {
    this.modalService.dismissAll(content);
  }

  fetchProjects(id:String){
    this.projectservices.fetchProject(id).subscribe((res) =>{
      this.data = res;
      this.projectName = this.data.projectName;
      this.Description = this.data.Description;
      this.CoverImage =  this.data.CoverImage;
      this.MainImage = this.data.MainImage;
      this.Deadline = this.data.Deadline;
      console.log(this.data);
    })


  }


  editProject(){
    let project ={
      projectName : this.projectName,
      Description : this.Description,
      Deadline: this.Deadline,
      CoverImage : this.CoverImage,
      MainImage: this.MainImage,
      AdminID : this.AdminID,
      workspaceID : this.workspaceID
    }

    console.log(project);


  }
}
