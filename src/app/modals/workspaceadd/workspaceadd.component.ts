import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import {WorkspaceservicesService} from "../../services/workspaces/workspaceservices.service";


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
  AdminID: string = "11111"


  // accessing the template
  @ViewChild('content') private content: TemplateRef<any> | undefined;

  constructor(private modalService: NgbModal, private workspaceservices:WorkspaceservicesService) { }

  ngOnInit(): void {
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
    this.workspaceservices.addWorkspace(object2).subscribe((res)=>{
        console.log(res);
        this.closeModal();
      this.modalService.open(this.content, { centered: true }, );
    })

  }
}
