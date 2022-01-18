import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import {ProjectsService} from "../../services/projects/projects.service";

import {WorkspaceservicesService} from "../../services/workspaces/workspaceservices.service";
import {UserService} from "../../services/user.service";

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
  min:any = "";
  flagName = false;
  flagDescription = false;
  valid = false;

  // accessing the template

  //Success Modal
  @ViewChild('content') private content: TemplateRef<any> | undefined;

  //Loading Modal
  @ViewChild('content3') private content3: TemplateRef<any> | undefined;

  //Error Modal
  @ViewChild('content4') private content4: TemplateRef<any> | undefined;

  //Confirm Delete Modal
  @ViewChild('content5') private content5: TemplateRef<any> | undefined;

  //Deleted Confirmation
  @ViewChild('content6') private content6: TemplateRef<any> | undefined;

  constructor(private modalService: NgbModal, private projectservices:ProjectsService, private userservice:UserService, private workspaceservice:WorkspaceservicesService) { }

  ngOnInit(): void {
    this.fetchProjects(this.projectID);
    this.getDate();
  }
  closeModal() {
    this.modalService.dismissAll();
  }

  saveDetails(content: any) {
    this.modalService.dismissAll(content);
  }

  closeAnimation(){
    this.modalService.dismissAll(this.content3);
  }

  closeConfirmation(){
    this.modalService.dismissAll(this.content6);
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

  checkvalidity(){
    if(this.projectName.length < 1 && this.Description.length >=1 ){
      this.flagName = true
      this.flagDescription = false
    }else if(this.Description.length < 1 && this.projectName.length >=1){
      this.flagName = false
      this.flagDescription = true
    }else if(this.projectName.length < 1 && this.Description.length < 1){
      this.flagName = true
      this.flagDescription = true
    }else{
      this.flagName = false
      this.flagDescription = false
      this.valid = true
    }
  }


  editProject(){

    this.checkvalidity();

    console.log(this.valid);

    if(this.valid == false){

    }else {

      try {

        this.modalService.open(this.content3, {centered: true},);
        let project = {
          projectName: this.projectName,
          Description: this.Description,
          Deadline: this.Deadline,
          CoverImage: this.CoverImage,
          MainImage: this.MainImage,
          AdminID: this.AdminID,
          workspaceID: this.workspaceID
        }

        this.projectservices.editProject(this.projectID, project).subscribe((res) => {
          console.log(res);
          this.closeAnimation();
          this.closeModal();
          this.modalService.open(this.content, {centered: true},);

        })

        console.log(project);


      } catch (error) {
        console.log(error);
        this.modalService.open(this.content4, {centered: true});

      }


    }
    }

    confirmDelete(){
      this.modalService.open(this.content5, {centered: true});

    }

    deleteProject(){

      // this.modalService.open(this.content3, {centered: true});

      console.log("Project Deleted");
      this.closeModal();

      this.closeConfirmation();

      // this.modalService.open(this.content, {centered: true});


      // try{
      //   //Delete Project
      //   this.projectservices.removeProject(this.projectID).subscribe((res)=>{
      //     console.log(res);
      //
      //     //Delete project from Workspace
      //     this.workspaceservice.removeProject(this.workspaceID,this.projectID).subscribe((res) =>{
      //       console.log(res);
      //
      //       //Delete project from Admin
      //       this.userservice.removeProject(this.AdminID, this.projectID).subscribe((res) => {
      //         console.log(res);
      //             this.closeAnimation();
      //             this.closeModal();
      //             this.modalService.open(this.content6, {centered: true});
      //       })
      //     })
      //   })
      //
      // }catch(err){
      //   console.log(err);
      //   this.modalService.open(this.content4, {centered: true});
      //
      // }
      //


    }

  getDate(){
    let date:any = new Date();
    let toDate:any = date.getDate();
    let month:any = date.getMonth() + 1;
    let year = date.getFullYear();

    if (toDate < 10){
      toDate = '0' + toDate;
    }
    if (month < 10){
      month = '0' + month;
    }

    this.min = year + "-" + month + "-" + toDate;

    console.log(this.min);
  }

}
