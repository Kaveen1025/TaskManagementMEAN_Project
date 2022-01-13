import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProjectsService} from "../../services/projects/projects.service";

@Component({
  selector: 'app-projectadd',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {

  //Attributes
  projectName : String ="";
  Description : String ="";
  Deadline: String ="";
  CoverImage : String ="";
  MainImage: String ="";
  AdminID : String ="11111";
  workspaceID : String ="33333";



  constructor(private modalService: NgbModal, private projectservices:ProjectsService) { }

  ngOnInit(): void {
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

  addProject(){

    let project ={
      projectName : this.projectName,
      Description : this.Description,
      Deadline: this.Deadline,
      CoverImage : this.CoverImage,
      MainImage: this.MainImage,
      AdminID : this.AdminID,
      workspaceID : this.workspaceID
    }

    console.log (project);

    this.projectservices.addProject(project).subscribe((res)=>{
      console.log(res);

    })
  }
}
