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


  // accessing the template
  @ViewChild('content') private content: TemplateRef<any> | undefined;

  @Output() reRenderDetails = new EventEmitter<string>();


  constructor(private modalService: NgbModal, private workspaceservices:WorkspaceservicesService, private userservice:UserService) { }

  ngOnInit(): void {
    localStorage.setItem("AdminID","61d59e7999dc1f31177898ba");
  }


  closeModal() {
    this.modalService.dismissAll();
  }

  saveDetails(content: any) {
    this.modalService.dismissAll(content);
  }

  saveWorkspace(){

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
        this.closeModal();
        this.reRenderDetails.emit();
        this.modalService.open(this.content, { centered: true }, );
      })

    })


    })

  }
}
