import {Component, OnInit, TemplateRef, ViewChild, Output,Input, EventEmitter} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProjectsService} from "../../services/projects/projects.service";
import {WorkspaceservicesService} from "../../services/workspaces/workspaceservices.service";
import {UserService} from "../../services/user.service";

//Import Firebase services
import {FileUpload} from "../../module/file-upload";
import {FirebasesService} from "../../services/firebases.service";

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
  CoverImage : string ="";
  MainImage: string ="";
  AdminID: any = localStorage.getItem("AdminID");
  data:any;
  min:any = "";
  flagName = false;
  flagDescription = false;
  valid = false;

  //File upload attributes
  // @ts-ignore
  mainImageFile = new FileUpload();
  // @ts-ignore
  coverImageFile = new FileUpload();

  //Percentage loading attribute
  percentageLoading:any = false;






  //Declare Firebase Services
  FirebaseService:FirebasesService

  // accessing the template
  @ViewChild('content') private content: TemplateRef<any> | undefined;

  @ViewChild('content3') private content3: TemplateRef<any> | undefined;

  @ViewChild('content4') private content4: TemplateRef<any> | undefined;



  @Output() reRenderDetails = new EventEmitter<string>();

  @Input() WorkSpaceID: any;

  constructor(private modalService: NgbModal, private projectservices:ProjectsService, private userservice:UserService, private workspaceservice:WorkspaceservicesService,FirebaseService: FirebasesService) {
    //Initialize firebase services
    this.FirebaseService = FirebaseService;
  }

  ngOnInit(): void {
    localStorage.setItem("AdminID","61dd30e3dd092e9def37e4b5");
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


  onMainSelected(event: any){
    if(event.target.files.length > 0)
    {
      console.log(event.target.files[0].name);
      this.MainImage = event.target.files[0].name;
      let URL = new Date().getTime() + this.MainImage

      this.MainImage = "ProjectMainImages/" + new Date().getTime() + this.MainImage

      this.mainImageFile.setValues(this.MainImage,URL,event.target.files[0])

      console.log("aaaa")
      console.log(this.mainImageFile)
      console.log(event.target.files[0])


    }
  }


  onCoverSelected(event: any){
    if(event.target.files.length > 0)
    {

      this.CoverImage = event.target.files[0].name;
      let URL = new Date().getTime() + this.CoverImage

      this.CoverImage = "ProjectCoverImages/" +new Date().getTime()+ this.CoverImage

      this.coverImageFile.setValues(this.CoverImage,URL,event.target.files[0])

      console.log(this.CoverImage)



    }
  }














  addProject(){

    //Open Loading Modal
    this.modalService.open(this.content3, {centered: true},);

    this.checkvalidity();

    console.log(this.valid);

    if(this.valid == false){

    }else {

      try {
        //Open Loading Modal
        this.modalService.open(this.content3, {centered: true},);


        let project = {
          projectName: this.projectName,
          Description: this.Description,
          Deadline: this.Deadline,
          CoverImage: this.CoverImage,
          MainImage: this.MainImage,
          AdminID: this.AdminID,
          workspaceID: this.WorkSpaceID
        }

        console.log(project);

        //Add Project to Projects
        this.projectservices.addProject(project).subscribe((res) => {
          console.log(res);
          console.log(this.projectName);

          //Get Project ID by passing project name
          this.projectservices.fetchProjectbyName(this.projectName).subscribe((res) => {
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

                //Close Loading Modal
                this.closeAnimation();

                this.reRenderDetails.emit();

                this.closeModal();

                //Open Success Modal
                this.modalService.open(this.content, {centered: true},);


              })
            })

          })


        })


      } catch (error) {
        console.log(error);
        alert(error);
        this.modalService.open(this.content4, {centered: true});

      }


        }

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

  test(event: any) {
    console.log(event.target.files)

  }




  uploadImage(){

    this.checkvalidity();

    console.log("Upload Image Running");

    let currentMainUpload = this.mainImageFile;
    let currentCoverUpload = this.coverImageFile;


    console.log(currentMainUpload);
    console.log(currentMainUpload);

    console.log("Valid :" + this.valid);

    if(this.valid == false){

    }else {


      this.percentageLoading = true;

      if(this.mainImageFile.file != undefined && this.coverImageFile.file != undefined){
        this.FirebaseService.pushToWorkSpaceStorage(currentMainUpload).subscribe(
          percentage => {
            percentage = Math.round(percentage ? percentage : 0);
            console.log('done')

            if(percentage >= 100 && this.percentageLoading){

              this.FirebaseService.pushToWorkSpaceStorage(currentCoverUpload).subscribe(
                percentage => {
                  percentage = Math.round(percentage ? percentage : 0);
                  console.log('done')
                  if(percentage >= 100 && this.percentageLoading){
                    this.percentageLoading = false;

                    //Project Add Section;

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
      }else if(this.mainImageFile.file == undefined && this.coverImageFile.file == undefined) {






        console.log("Mokk Hri Awulk");
      }

      // aa
    }
  }






  // editProject(){
  //   let currentMainUpload = this.mainImageFile;
  //   let currentCoverUpload = this.coverImageFile;
  //
  //
  //   if(this.flagName == true || this.flagDescription == true){
  //
  //   }else {
  //
  //     let status = 1
  //     this.loadingStatus = true;
  //     // this.closeModal()
  //     this.modalEvent.emit("1")
  //
  //     let percentage;
  //     if(this.mainImageFile.file != undefined && this.coverImageFile.file != undefined){
  //       // alert("both undefined")
  //       this.FirebaseService.pushToWorkSpaceStorage(currentMainUpload).subscribe(
  //         percentage => {
  //           percentage = Math.round(percentage ? percentage : 0);
  //           console.log('done')
  //
  //           if(percentage >= 100 && this.loadingStatus == true){
  //             let detailsObject = {
  //               WorkspaceName: this.workspacename,
  //               Description: this.description,
  //               MainImage: this.mainimage,
  //               CoverImage: this.coverimage,
  //             }
  //             this.FirebaseService.pushToWorkSpaceStorage(currentCoverUpload).subscribe(
  //               percentage => {
  //                 percentage = Math.round(percentage ? percentage : 0);
  //                 console.log('done')
  //                 if(percentage >= 100){
  //                   this.workspaceService.updateWorkspace(this.workspaceID, detailsObject).subscribe((post: any) => {
  //                     this.loadingStatus = false
  //                     // alert("Successfully Updated BOTH")
  //                     this.reRenderEvent.emit();
  //                     status = 2
  //                     this.modalEvent.emit("2");
  //                     // this.closeModal();
  //
  //
  //
  //                   }, error => {
  //                     console.log(error);
  //
  //                   });
  //
  //                 }
  //               },
  //               error => {
  //                 console.log(error);
  //                 this.closeModal()
  //               }
  //             );
  //           }
  //
  //         },
  //         error => {
  //           console.log(error);
  //           // alert("bbb")
  //
  //           // this.contentStatus1 = false
  //           this.closeModal()
  //         }
  //       );
  //     }else if(this.mainImageFile.file != undefined && this.coverImageFile.file == undefined){
  //       // alert("coverimage undefined")
  //       this.FirebaseService.pushToWorkSpaceStorage(currentMainUpload).subscribe(
  //         percentage => {
  //           percentage = Math.round(percentage ? percentage : 0);
  //           console.log('done')
  //
  //           if(percentage >= 100 && this.loadingStatus == true){
  //             let detailsObject = {
  //               WorkspaceName: this.workspacename,
  //               Description: this.description,
  //               MainImage: this.mainimage,
  //               CoverImage: this.coverimage,
  //             }
  //             this.workspaceService.updateWorkspace(this.workspaceID, detailsObject).subscribe((post: any) => {
  //               this.loadingStatus = false;
  //               // alert("Successfully Updated cover undifined")
  //
  //               this.reRenderEvent.emit();
  //               this.modalEvent.emit("2");
  //               // this.closeModal();
  //
  //
  //
  //             }, error => {
  //               console.log(error);
  //
  //             });
  //
  //           }
  //
  //         },
  //         error => {
  //           console.log(error);
  //           // alert("bbb")
  //
  //           // this.contentStatus1 = false
  //           this.closeModal()
  //         }
  //       );
  //     }else if(this.mainImageFile.file == undefined && this.coverImageFile.file != undefined){
  //       this.FirebaseService.pushToWorkSpaceStorage(currentCoverUpload).subscribe(
  //         percentage => {
  //           percentage = Math.round(percentage ? percentage : 0);
  //           // console.log('done')
  //
  //           if(percentage >= 100 && this.loadingStatus == true){
  //             let detailsObject = {
  //               WorkspaceName: this.workspacename,
  //               Description: this.description,
  //               MainImage: this.mainimage,
  //               CoverImage: this.coverimage,
  //             }
  //             this.workspaceService.updateWorkspace(this.workspaceID, detailsObject).subscribe((post: any) => {
  //               this.loadingStatus = false
  //               // alert("Successfully Updated main yndefined")
  //               this.modalEvent.emit("2");
  //               this.reRenderEvent.emit();
  //               // this.closeModal();
  //
  //
  //             }, error => {
  //               console.log(error);
  //
  //             });
  //
  //           }
  //
  //         },
  //         error => {
  //           console.log(error);
  //           alert("bbb")
  //
  //           // this.contentStatus1 = false
  //           // this.closeModal()
  //         }
  //       );
  //
  //     }else{
  //       let detailsObject = {
  //         WorkspaceName: this.workspacename,
  //         Description: this.description,
  //         MainImage: this.mainimage,
  //         CoverImage: this.coverimage,
  //       }
  //
  //       this.workspaceService.updateWorkspace(this.workspaceID, detailsObject).subscribe((post: any) => {
  //         this.loadingStatus = false;
  //         // alert("Successfully Updated both undefined")
  //         this.modalEvent.emit("2");
  //         this.reRenderEvent.emit();
  //         // this.closeModal();
  //
  //
  //
  //
  //       }, error => {
  //         console.log(error);
  //
  //       });
  //     }
  //
  //     // aa
  //   }
  //
  //


  // }







}
