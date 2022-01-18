import {Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {WorkspaceService} from "../../services/workspacepage.service";
import {FileUpload} from "../../module/file-upload";
import {FirebasesService} from "../../services/firebases.service";
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


  constructor(private modalService: NgbModal, workspaceService : WorkspaceService, FirebaseService: FirebasesService) {
    this.workspaceService = workspaceService;
    this.FirebaseService = FirebaseService
  }

  FirebaseService:FirebasesService
  workspacename: string = "";
  coverimage: string = "";
  mainimage: string = "";
  // @ts-ignore
  mainImageFile = new FileUpload();
  // @ts-ignore
  coverImageFile = new FileUpload();
  // @ts-ignore
  emptyFile = new FileUpload();

  description: string = "";
  workspaceID: string = "";
  constcoverimage: string = "";
  constmainimage: string = "";
  flagName = false;
  flagDescription = false;

  nametext = "";
  destext = "";

  percentageLoading:any = false

  object1: {} = {};


  ngOnInit(): void {
    console.log("asd");
    console.log(this.workspaceDetails)
    this.workspacename = this.workspaceDetails.WorkspaceName;
    this.coverimage = this.workspaceDetails.CoverImage;
    this.mainimage = this.workspaceDetails.MainImage;
    this.description = this.workspaceDetails.Description;
    this.workspaceID = this.workspaceDetails._id;
    this.nametext = this.workspaceDetails.WorkspaceName;
    this.destext = this.workspaceDetails.Description;


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
    let currentMainUpload = this.mainImageFile;
    let currentCoverUpload = this.coverImageFile;

    if(this.workspacename == this.nametext && this.description == this.destext){
      this.flagName = true;
      this.flagDescription = true
    }else{
      if(this.flagName == true || this.flagDescription == true){

      }else {

        let a = 1
        this.percentageLoading = true
        let percentage;
        if(this.mainImageFile.file != undefined && this.coverImageFile.file != undefined){
          // alert("both undefined")
          this.FirebaseService.pushToWorkSpaceStorage(currentMainUpload).subscribe(
            percentage => {
              percentage = Math.round(percentage ? percentage : 0);
              console.log('done')

              if(percentage >= 100 && this.percentageLoading){
                let detailsObject = {
                  WorkspaceName: this.workspacename,
                  Description: this.description,
                  MainImage: this.mainimage,
                  CoverImage: this.coverimage,
                }
                this.FirebaseService.pushToWorkSpaceStorage(currentCoverUpload).subscribe(
                  percentage => {
                    percentage = Math.round(percentage ? percentage : 0);
                    console.log('done')
                    if(percentage >= 100 && this.percentageLoading){
                      this.percentageLoading = false
                      this.workspaceService.updateWorkspace(this.workspaceID, detailsObject).subscribe((post: any) => {
                        this.closeModal();
                        alert("Successfully Updated")
                        this.percentageLoading = false;
                        this.reRenderEvent.emit();


                      }, error => {
                        console.log(error);

                      });

                    }
                  },
                  error => {
                    console.log(error);
                    this.closeModal()
                  }
                );
              }

            },
            error => {
              console.log(error);
              alert("bbb")

              // this.contentStatus1 = false
              this.closeModal()
            }
          );
        }else if(this.mainImageFile.file != undefined && this.coverImageFile.file == undefined){
          alert("coverimage undefined")
          this.FirebaseService.pushToWorkSpaceStorage(currentMainUpload).subscribe(
            percentage => {
              percentage = Math.round(percentage ? percentage : 0);
              console.log('done')

              if(percentage >= 100 && this.percentageLoading){
                this.percentageLoading = false
                let detailsObject = {
                  WorkspaceName: this.workspacename,
                  Description: this.description,
                  MainImage: this.mainimage,
                  CoverImage: this.coverimage,
                }
                this.workspaceService.updateWorkspace(this.workspaceID, detailsObject).subscribe((post: any) => {
                  this.closeModal();
                  alert("Successfully Updated")
                  this.percentageLoading = false;
                  this.reRenderEvent.emit();


                }, error => {
                  console.log(error);

                });

              }

            },
            error => {
              console.log(error);
              alert("bbb")

              // this.contentStatus1 = false
              this.closeModal()
            }
          );
        }else if(this.mainImageFile.file == undefined && this.coverImageFile.file != undefined){
          this.FirebaseService.pushToWorkSpaceStorage(currentMainUpload).subscribe(
            percentage => {
              percentage = Math.round(percentage ? percentage : 0);
              console.log('done')

              if(percentage >= 100 && this.percentageLoading){
                this.percentageLoading = false
                let detailsObject = {
                  WorkspaceName: this.workspacename,
                  Description: this.description,
                  MainImage: this.mainimage,
                  CoverImage: this.coverimage,
                }
                this.workspaceService.updateWorkspace(this.workspaceID, detailsObject).subscribe((post: any) => {
                  this.closeModal();
                  alert("Successfully Updated")
                  this.percentageLoading = false;
                  this.reRenderEvent.emit();


                }, error => {
                  console.log(error);

                });

              }

            },
            error => {
              console.log(error);
              alert("bbb")

              // this.contentStatus1 = false
              this.closeModal()
            }
          );

        }else{
          let detailsObject = {
            WorkspaceName: this.workspacename,
            Description: this.description,
            MainImage: this.mainimage,
            CoverImage: this.coverimage,
          }

          this.workspaceService.updateWorkspace(this.workspaceID, detailsObject).subscribe((post: any) => {
            alert("Successfully Updated")
            this.percentageLoading = false;
            this.closeModal();
            this.reRenderEvent.emit();


          }, error => {
            console.log(error);

          });
        }

        // aa
      }

    }

  }

  onMainSelected(event: any){
    if(event.target.files.length > 0)
    {
      // console.log(event.target.files[0].name);
      this.mainimage = event.target.files[0].name;
      let URL = this.workspaceID + this.mainimage
      // this.mainImageFile = event.target.files[0];
      this.mainimage = "WoskspaceMainImages/" + this.workspaceID + this.mainimage

      this.mainImageFile.setValues(this.mainimage,URL,event.target.files[0])

      // this.mainImageFile.file = event.target.files[0];
      // this.mainImageFile.name = this.mainimage;
      // this.mainImageFile.url = this.mainimage;

      //
      // console.log("aaaa")
      // console.log(this.mainImageFile)
      // console.log(event.target.files[0])
    }else{
      this.mainImageFile = this.emptyFile
    }
  }

  onCoverSelected(event: any){
    if(event.target.files.length > 0)
    {
      // console.log(event.target.files[0].name);
      this.coverimage = event.target.files[0].name;
      let URL = this.workspaceID + this.coverimage

      this.coverimage = "WoskspaceCoverImages/" + this.workspaceID + this.coverimage

      this.coverImageFile.setValues(this.coverimage,URL,event.target.files[0])

      console.log(this.coverImageFile)
      console.log(this.mainImageFile)


      // this.coverImageFile.name = event.target.files[0].name
    }else{
      this.coverImageFile = this.emptyFile
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
