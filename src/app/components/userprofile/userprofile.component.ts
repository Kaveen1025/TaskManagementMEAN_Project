import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  @Input() newItemEvent: any;
  UserService:UserService
  user: any
  userID: String
  @ViewChild('content99') private content99: TemplateRef<any> | undefined;
  constructor(UserService:UserService,private modalService: NgbModal) {
    this.userID = "61d59e7999dc1f31177898ba"
    this.UserService = UserService
  }

  ngOnInit(): void {
    this.getUser()
  }
  getUser(){
    this.UserService.getUser(this.userID).subscribe({
      next:value=>
      {
        this.user = value
      }
      ,
      error:error => {
        console.log(error)
      }
    } )
  }

  openUserImageEditModal() {
    this.modalService.open(this.content99, { centered: true });
  }
}
