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

  @Output() setProjects = new EventEmitter();

  percentageLoading:any = false

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

  workspaceMainPlaceHolder: string = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/userPlaceHolder.png"

  searchText: string = ""
  flagEditBtns = true;
  flagCreateBtn = true;
  loadingStatus = false;


  async ngOnInit(): Promise<void> {
    await this.getProjectDetails();
    await this.getWorkspaceDetails()
  }

  workspaceService : WorkspaceService;

  constructor(workspaceService : WorkspaceService, private modalService: NgbModal, private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.workspaceService = workspaceService;
  }



  getProjectDetails(){
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

      alert("aaa")
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

  openVerticallyCentered() {
    // console.log(this.modalContent);
    this.modalService.open(this.modalContent, { centered: true, size : "lg", backdrop: "static"});
  }

  getworkspaceMainImage(url:any){
    // alert("asd")
    this.workspaceMainImage = this.workspaceMainPlaceHolder
    const storageRef = this.storage.ref(url);
    storageRef.getDownloadURL().subscribe(downloadURL => {
      this.workspaceMainImage = this.workspaceMainPlaceHolder
      this.workspaceMainImage = downloadURL
      console.log("work")
      console.log(this.workspaceMainImage)

    })
  }

  getworkspaceCoverImage(url:any){
    // alert("asd")
    this.workspaceCoverImage = this.workspaceMainPlaceHolder
    const storageRef = this.storage.ref(url);
    storageRef.getDownloadURL().subscribe(downloadURL => {
      this.workspaceCoverImage = this.workspaceMainPlaceHolder
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
      alert("1")
      this.percentageLoading = true;
    }else{
      alert("2")
      this.percentageLoading = false;

    }

  }

  reload(){
    // console.log("Reloading....");
    this.getProjectDetails();
    this.getWorkspaceDetails();
  }
}
