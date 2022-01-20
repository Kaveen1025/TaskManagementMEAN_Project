import {Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {WorkspaceService} from "../../services/workspacepage.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {WorkspaceeditComponent} from "./../../modals/workspaceedit/workspaceedit.component";

@Component({
  selector: 'app-workspacepage',
  templateUrl: './workspacepage.component.html',
  styleUrls: ['./workspacepage.component.css']
})
export class WorkspacepageComponent implements OnInit {

  @ViewChild('content', {static: true}) modalContent: TemplateRef<any> | undefined
  @ViewChild('content2', {static: true}) content2: TemplateRef<any> | undefined
  @ViewChild('content3', {static: true}) content3: TemplateRef<any> | undefined
  @ViewChild('content4', {static: true}) content4: TemplateRef<any> | undefined
  @ViewChild('content5', {static: true}) content5: TemplateRef<any> | undefined



  @Output() setProjects = new EventEmitter();

  percentageLoading:any = false


  placeholderMainStatus = false
  ImageStaus = false;


  userID: string = "61d458c91d0655dd1358454a";
  workspaceID = "61d448976fc2f6cc55b25ca5";
  projects: any[] = [];
  projectObject: any = {};
  projectObjectConstant: any[] = [{}];
  noOfProjects: string = "";
  noOfMembers: string = "";
  noOfGuests: string = "";
  workspaceTitle: string = "";
  workspaceDescription: string = "";
  workspaceCoverImage: string = "";
  workspaceMainImage: string = "";
  adminID: string = "";
  workspaceModal : any;
  errorText: string = ""
  memberIDs: string[] = [];
  workspaceObject: any;


  images = [
    {
      main : "./assets/images/Workspace%20and%20Project%20Images/Default%20workspace%20cover%20images/bananas.png",
      cover : "./assets/images/Workspace%20and%20Project%20Images/Default%20workspace%20main%20images/8sz44m1xhr961.png"
    },
    {
      main : "./assets/images/Workspace%20and%20Project%20Images/Default%20workspace%20cover%20images/lemon.png",
      cover : "./assets/images/Workspace%20and%20Project%20Images/Default%20workspace%20main%20images/among-trees.jpeg"
    },
    {
      main : "./assets/images/Workspace%20and%20Project%20Images/Default%20workspace%20cover%20images/orange-juice.png",
      cover : "./assets/images/Workspace%20and%20Project%20Images/Default%20workspace%20main%20images/minimalist-landscape-to-1600x900.jpeg"
    },
    {
      main : "./assets/images/Workspace%20and%20Project%20Images/Default%20workspace%20cover%20images/strawberry.png",
      cover : "./assets/images/Workspace%20and%20Project%20Images/Default%20workspace%20main%20images/wallpapersden.com_76272-1920x1080.jpg"
    },
  ]

  min = Math.ceil(0);
  max = Math.floor(4);
  number = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
  number1 = Math.floor(Math.random() * (4 - 0 + 1)) + 0;



  workspaceMainPlaceHolder: string =  this.images[this.number].main
  workspaceCoverPlaceHolder: string =  this.images[this.number1].cover


  searchText: string = ""
  flagEditBtns = true;
  flagCreateBtn = true;
  loadingStatus = false;


  async ngOnInit(): Promise<void> {
    await this.getProjectDetails();
    await this.getWorkspaceDetails()
    // this.openSuccessModal()
  }

  workspaceService : WorkspaceService;

  constructor(workspaceService : WorkspaceService, private modalService: NgbModal, private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.workspaceService = workspaceService;
  }



  getProjectDetails(){
    // alert(this.numbber)
    this.workspaceService.getAllProjects(this.workspaceID).subscribe((post: any)=> {
      this.projectObject = post;
      this.projectObjectConstant = this.projectObject[0].Projects;
      // console.log("Project Details")
      // console.log(this.projectObject[0]);
      if(this.projectObjectConstant.length < 0){
        this.projects = [];
        this.errorText = "No Projects available"
      }else{
        this.projects = this.projectObject[0].Projects;
      }
      this.loadingStatus = true;

    }, error => {
      alert("asd")
      console.log(error);
    });

  }
  getWorkspaceDetails(){
    this.workspaceService.getWorkspaceData(this.workspaceID).subscribe((post: any)=> {

      console.log("Project Details")
      console.log(post)

      this.noOfMembers = post.MemberIDs.length
      this.noOfProjects = post.ProjectIDs.length
      this.noOfGuests = post.guestIDs.length
      this.workspaceTitle = post.WorkspaceName;
      this.workspaceCoverImage = post.CoverImage;
      this.workspaceMainImage = post.MainImage;
      this.workspaceDescription = post.Description;
      this.adminID = post.AdminID;
      this.memberIDs = post.MemberIDs

      this.workspaceObject = post;
      this.checkPrivvilage();

      this.getworkspaceMainImage(this.workspaceMainImage);
      this.getworkspaceCoverImage(this.workspaceCoverImage);

    }, error => {
      alert("asd")
      console.log(error);
    });
  }


  checkPrivvilage(){
    // console.log(this.adminID)
    // console.log(this.memberIDs)
    let c = 1;
    for(let i = 0; i < this.memberIDs.length; i++){
      if(this.memberIDs[i]== this.userID){
        c = 2;
        break;
      }
    }
    if(this.adminID == this.userID){
      this.flagCreateBtn = true;
      this.flagEditBtns = true;
    }else if(c == 2){
      this.flagCreateBtn = true;
      this.flagEditBtns = false;
    }else{
      this.flagCreateBtn = false;
      this.flagEditBtns = false;
    }

  }

  searchProjects(){
    let i: number = 0
    console.log(this.projectObjectConstant)
    let searchResult = this.projectObjectConstant.filter(
      (post) =>
        post.projectName.toLowerCase().includes(this.searchText.toLowerCase())
    );

    if(searchResult.length >0){
      console.log("Return array")
      console.log(searchResult)
      this.projects = searchResult;
      this.errorText = ""
    }else{
      this.projects = [];
      this.errorText = "No Projects available"
    }

  }


  closeModal() {
    this.modalService.dismissAll(this.content3);
    // this.callParent()
  }

  getworkspaceMainImage(url:any){
    // alert("asd")
    this.workspaceMainImage = this.workspaceMainPlaceHolder
    this.ImageStaus = false
    this.placeholderMainStatus = true
    const storageRef = this.storage.ref(url);
    storageRef.getDownloadURL().subscribe(downloadURL => {
      // this.workspaceMainImage = this.workspaceMainPlaceHolder
      this.workspaceMainImage = downloadURL

      console.log("work")
      console.log(this.workspaceMainImage)
      this.placeholderMainStatus = false
      this.ImageStaus = true
    })
  }

  getworkspaceCoverImage(url:any){
    // alert("asd")
    this.workspaceCoverImage = this.workspaceCoverPlaceHolder
    const storageRef = this.storage.ref(url);
    storageRef.getDownloadURL().subscribe(downloadURL => {
      this.workspaceCoverImage = this.workspaceCoverPlaceHolder
      this.workspaceCoverImage = downloadURL

      console.log("work")
      console.log(this.workspaceCoverImage)

    })
  }


  CreateProject() {
    this.modalService.open(this.content2, { centered: true, size:"lg", backdrop: "static" }, );
  }

  displayModal(value: string){
    // alert("bbbb" )
    if(value == "1"){
      this.openWaitingModal()
    }else{
      this.closeModal()
      this.openSuccessModal()

    }

  }

  openVerticallyCentered() {
    // console.log(this.modalContent);
    this.modalService.open(this.modalContent, { centered: true, size : "lg", backdrop: "static"});
  }

  openWaitingModal() {
    // console.log(this.modalContent);
    this.modalService.open(this.content3, { centered: true, size : "lg", backdrop: "static"});
  }

  openSuccessModal() {
    // console.log(this.modalContent);
    // alert("Open")
    this.modalService.open(this.content4, { centered: true, size : "lg", backdrop: "static"});
  }


  reload(){
    // console.log("Reloading....");
    this.getProjectDetails();
    this.getWorkspaceDetails();
  }


  confirmDelete(){
    this.modalService.open(this.content5, { centered: true, backdrop: "static"});
  }


  deleteworkspace(){
    this.closeModal()
    this.openWaitingModal()

    // this.openSuccessModal()


  }

}
