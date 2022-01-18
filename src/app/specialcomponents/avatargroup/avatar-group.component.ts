import {Component, Input, OnInit} from '@angular/core';
import {AvatargroupService} from "../../services/avatargroup.services";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-avatar-group',
  templateUrl: './avatar-group.component.html',
  styleUrls: ['./avatar-group.component.css']
})
export class AvatarGroupComponent implements OnInit {

  avatarArray:any[] = [];
  newArray:any[] = [];
  i:String;
  textAvatarElement:boolean;
  members: any = [{}];
  memberObject: any = {};
  ProfileImage: string = ""
  ProfileImagePlaceHolder: string = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/userPlaceHolder.png"


  avatarGroupService: AvatargroupService;

  @Input() projectID: any;
  @Input() workspaceID: any;

  constructor(avatarGroupService: AvatargroupService,  private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.avatarGroupService = avatarGroupService;
    this.i = ""
    this.textAvatarElement = true
  }

  async ngOnInit(): Promise<void> {

    if(this.projectID != undefined) {
      await this.getProjectMemberDetails();
    }

    if(this.workspaceID != undefined) {
      await this.getWorkspaceMemberDetails();
    }
  }

  async getProjectMemberDetails() {
    await this.avatarGroupService.getAllMembers(this.projectID).subscribe(async (post: any) => {
      this.memberObject = post;

      this.members = this.memberObject[0].Members;
      // console.log("Single member")
      // console.log(this.members)
      // console.log(this.members[0].ProfileImage)

      this.avatarArray = this.members

      if (this.avatarArray.length >= 5) {
        this.i = '+' + String(this.avatarArray.length - 5)
        this.avatarArray = this.avatarArray.splice(0, 5)
        this.textAvatarElement = false
      }


      for (let i = 0; i < this.avatarArray.length; i++) {
        // console.log(this.avatarArray[i].ProfileImage)
        await this.getProjectuserprofileImage(this.avatarArray[i]);
      }

    });


  }

  async getWorkspaceMemberDetails() {
    await this.avatarGroupService.getWorkspaceMembers(this.workspaceID).subscribe(async (post: any) => {
      this.memberObject = post;

      this.avatarArray = this.memberObject[0].Members
      console.log(this.avatarArray)
      if (this.avatarArray.length >= 5) {
        this.i = '+' + String(this.avatarArray.length - 5)
        this.avatarArray = this.avatarArray.splice(0, 5)
        this.textAvatarElement = false
      }
      for (let i = 0; i < this.avatarArray.length; i++) {
        // console.log(this.avatarArray[i].ProfileImage)
        await this.getWorkspaceuserprofileImage(this.avatarArray[i]);
      }

    });

  }

  getWorkspaceuserprofileImage(url:any){
    // alert("asd")
    this.ProfileImage = this.ProfileImagePlaceHolder
    const storageRef = this.storage.ref(url.ProfileImage);
    storageRef.getDownloadURL().subscribe(downloadURL => {
      this.ProfileImage = this.ProfileImagePlaceHolder
      this.ProfileImage = downloadURL
      // console.log("work")
      // console.log(this.ProfileImage)

      this.newArray.push(downloadURL);
      // console.log(this.newArray)
    })

  }

  getProjectuserprofileImage(url:any){
    // alert("asd")
    this.ProfileImage = this.ProfileImagePlaceHolder
    const storageRef = this.storage.ref(url.ProfileImage);
    storageRef.getDownloadURL().subscribe(downloadURL => {
      this.ProfileImage = this.ProfileImagePlaceHolder
      this.ProfileImage = downloadURL
      // console.log("work")
      // console.log(this.ProfileImage)

      this.newArray.push(downloadURL);


      // console.log(this.newArray)
    }, error => {
      // alert("errt")
      this.newArray.push(this.ProfileImagePlaceHolder);
    })


  }
}
