import {Component, Input, OnInit} from '@angular/core';
import {AvatargroupService} from "../../services/avatargroup.services";

@Component({
  selector: 'app-avatar-group',
  templateUrl: './avatar-group.component.html',
  styleUrls: ['./avatar-group.component.css']
})
export class AvatarGroupComponent implements OnInit {

  avatarArray:Object[] = [];
  i:String
  textAvatarElement:boolean;
  members: any = [{}];
  memberObject: any = {};
  ProfileImage: string = ""

  avatarGroupService: AvatargroupService;

  @Input() projectIDorWorkspaceID: any;

  constructor(avatarGroupService: AvatargroupService) {
    this.avatarGroupService = avatarGroupService;
    this.i = ""
    this.textAvatarElement = true
  }

  async ngOnInit(): Promise<void> {

    if(this.projectIDorWorkspaceID != undefined) {
      await this.getMemberDetails();
    }
  }

  async getMemberDetails() {
    await this.avatarGroupService.getAllMembers(this.projectIDorWorkspaceID).subscribe((post: any) => {
      this.memberObject = post;

      this.members = this.memberObject[0].Members;
      console.log("Single member")
      console.log(this.members)
      console.log(this.members[0].ProfileImage)

      this.avatarArray = this.members

      if (this.avatarArray.length >= 5) {
        this.i = '+' + String(this.avatarArray.length - 5)
        this.avatarArray = this.avatarArray.splice(0, 5)
        this.textAvatarElement = false
      }

    });


  }

}
