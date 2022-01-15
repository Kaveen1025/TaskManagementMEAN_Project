import {Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {WorkspaceService} from "../../services/workspacepage.service";
declare var $: any;


@Component({
  selector: 'app-workspaceedit',
  templateUrl: './workspaceedit.component.html',
  styleUrls: ['./workspaceedit.component.css']
})
export class WorkspaceeditComponent implements OnInit  {

  workspaceService : WorkspaceService;
  @ViewChild('content') private content: TemplateRef<any> | undefined;

  @Output() reRenderEvent = new EventEmitter<string>();
  @Input() workspaceDetails: any;


  constructor(private modalService: NgbModal, workspaceService : WorkspaceService,) {
    this.workspaceService = workspaceService;
  }


  workspacename: string = "";
  coverimage: string = "";
  mainimage: string = "";
  description: string = "";
  workspaceID: string = "";
  constcoverimage: string = "";
  constmainimage: string = "";
  flagName = false;
  flagDescription = false;


  object1: {} = {};


  ngOnInit(): void {
    console.log("asd");
    console.log(this.workspaceDetails)
    this.workspacename = this.workspaceDetails.WorkspaceName;
    this.coverimage = this.workspaceDetails.CoverImage;
    this.mainimage = this.workspaceDetails.MainImage;
    this.description = this.workspaceDetails.Description;
    this.workspaceID = this.workspaceDetails._id;

    this.constcoverimage = this.workspaceDetails.CoverImage;
    this.constmainimage = this.workspaceDetails.MainImage;

  }


  closeModal() {
    this.modalService.dismissAll(this.content);
    // this.callParent()
  }

  saveDetails(content: any) {
    this.modalService.dismissAll(content);
  }

  checkvalidity(){
    if(this.workspacename.length < 1 && this.description.length >=1 ){
      this.flagName = true
      this.flagDescription = false
    }else if(this.description.length < 1 && this.workspacename.length >=1){
      this.flagName = false
      this.flagDescription = true
    }else if(this.workspacename.length < 1 && this.description.length < 1){
      this.flagName = true
      this.flagDescription = true
    }else{
      this.flagName = false
      this.flagDescription = false
    }
  }

  editworkspace(){

    if(this.flagName == true || this.flagDescription == true){

    }else {
      let detailsObject = {
        WorkspaceName: this.workspacename,
        Description: this.description,
        MainImage: this.mainimage,
        CoverImage: this.coverimage,
      }

      this.workspaceService.updateWorkspace(this.workspaceID, detailsObject).subscribe((post: any) => {
        alert("Successfully Updated")
        this.closeModal();
        this.reRenderEvent.emit();


      }, error => {
        console.log(error);
      });
    }
  }

  deleteworkspace(){
    // Delete part completed......Just delete all projects belongs to this workplace and redirect to another page
    // this.workspaceService.deleteWorksplace(this.workspaceID).subscribe((post: any)=> {
    //   alert("Successfully Updated")
    //   this.closeModal();
    //   this.reRenderEvent.emit();
    //
    //
    // }, error => {
    //   console.log(error);
    // });
  }

}
