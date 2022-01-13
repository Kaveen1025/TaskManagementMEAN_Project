import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl} from "@angular/forms";
import {UserService} from "../../services/user.service";
// @ts-ignore
import * as bcrypt from 'bcryptjs';


@Component({
  selector: 'app-passwordconfrimmodal',
  templateUrl: './passwordconfrimmodal.component.html',
  styleUrls: ['./passwordconfrimmodal.component.css']
})
export class PasswordconfrimmodalComponent implements OnInit {
  @ViewChild('content') private content: TemplateRef<any> | undefined;
  currentPassword = new FormControl('');
  typeInput1:any
  eyeImageUrl1:any
  userID:String
  User:any
  UserService:UserService
  errorMsgStatus:boolean  = true
  errorMsg:any
  constructor(UserService:UserService,private modalService: NgbModal) {
    this.typeInput1 = "password"
    this.eyeImageUrl1 = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/visibility.png"
    this.UserService = UserService
    this.userID = "61d59e7999dc1f31177898ba"
  }

  ngOnInit(): void {
      this.getUser()
    this.errorMsgStatus = true
  }


  getUser(){
    this.UserService.getUser(this.userID).subscribe({
      next:value=>
      {
        this.User = value
      }
      ,
      error:error => {
        console.log(error)
      }
    } )
  }
  keyDownHandler(event: any) {
    if (event.which === 32)
      event.preventDefault();
  }


  saveDetails() {
    this.errorMsgStatus = true
    if(bcrypt.compareSync(this.currentPassword.value,this.User.Password)){
      console.log("true")

      // this.UserService.deleteUser(this.userID).subscribe({
      //   next:value=>
      //   {
      //     // navigate to login page
      //   }
      //   ,
      //   error:error => {
      //     console.log(error)
      // this.errorMsg = "Error has been occurred!"
      // this.errorMsgStatus = false
      //   }
      // } )
      //this.modalService.dismissAll(this.content);

    }else {
      console.log("false")

      this.errorMsg = "Incorrect password!"
      this.errorMsgStatus = false
    }
  }

  openModal(){
    this.modalService.open(this.content, { centered: true });
  }
  closeModal() {
    this.modalService.dismissAll(this.content);
  }


  toggleEye() {
    if(this.typeInput1 == "text"){
      this.typeInput1 = "password"
      this.eyeImageUrl1 = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/visibility.png"
    }else{
      this.typeInput1 = "text"
      this.eyeImageUrl1 = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/open.png"
    }

  }

}
