import {Component, OnInit, TemplateRef, ViewChild, Output,  EventEmitter} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import {WorkspaceservicesService} from "../../services/workspaces/workspaceservices.service";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-workspaceadd',
  templateUrl: './workspaceadd.component.html',
  styleUrls: ['./workspaceadd.component.css']
})
export class WorkspaceaddComponent implements OnInit {


  WorkspaceName: string = "";
  MainImage: string = "";
  CoverImage: string = "";
  Description: string = "";
  AdminID: any = localStorage.getItem("AdminID");
  WorkspaceID : any = "";
  data:any;
  min:any = "";
  flagName = false;
  flagDescription = false;
  valid = false;


  // accessing the template
  @ViewChild('content') private content: TemplateRef<any> | undefined;

  @ViewChild('content3') private content3: TemplateRef<any> | undefined;

  @ViewChild('content4') private content4: TemplateRef<any> | undefined;


  @Output() reRenderDetails = new EventEmitter<string>();


  constructor(private modalService: NgbModal, private workspaceservices:WorkspaceservicesService, private userservice:UserService) { }

  ngOnInit(): void {
    localStorage.setItem("AdminID","61d59e7999dc1f31177898ba")

  }


  closeModal() {
    this.modalService.dismissAll();
  }

  closeAnimation(){
    this.modalService.dismissAll(this.content3);
  }

  saveDetails(content: any) {
    this.modalService.dismissAll(content);
  }


  checkvalidity(){
    if(this.WorkspaceName.length < 1 && this.Description.length >=1 ){
      this.flagName = true
      this.flagDescription = false
    }else if(this.Description.length < 1 && this.WorkspaceName.length >=1){
      this.flagName = false
      this.flagDescription = true
    }else if(this.WorkspaceName.length < 1 && this.Description.length < 1){
      this.flagName = true
      this.flagDescription = true
    }else{
      this.flagName = false
      this.flagDescription = false
      this.valid = true
    }
  }


  saveWorkspace(){
    this.checkvalidity();

    console.log(this.valid);

    if(this.valid == false){

    }else {

      try {

        this.modalService.open(this.content3, {centered: true},);


        let object2 = {
          WorkspaceName:this.WorkspaceName,
          MainImage:this.MainImage,
          CoverImage:this.CoverImage,
          Description : this.Description,
          AdminID : this.AdminID

        }

        console.log(object2);
        console.log(localStorage.getItem("AdminID"));

        this.workspaceservices.addWorkspace(object2).subscribe((res)=>{
          console.log(res);

          this.workspaceservices.getByName(this.WorkspaceName).subscribe((res)=>{
            this.data = res;
            this.WorkspaceID = this.data._id;

            this.userservice.addWorkspace(this.AdminID,this.WorkspaceID).subscribe((res)=>{

              console.log(res);
              this.closeAnimation();
              this.reRenderDetails.emit();
              this.closeModal();
              this.modalService.open(this.content, { centered: true }, );
            })

          })


        })


      } catch (error) {
        console.log(error);
        this.modalService.open(this.content4, {centered: true});

      }


    }
































    }














































}
