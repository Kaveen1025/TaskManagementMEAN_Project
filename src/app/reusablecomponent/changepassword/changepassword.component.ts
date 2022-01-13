import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
// @ts-ignore
import * as bcrypt from 'bcryptjs';
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  userID:String
  User:any
  UserService:UserService

  currentPassword = new FormControl('');
  newPassword = new FormControl('');
  confirmPassword = new FormControl('');
  wrongPassword: boolean = true;
  mismatch: boolean = true;
  typeInput1: String
  typeInput2: String
  typeInput3: String
  eyeImageUrl1: String = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/visibility.png"
  eyeImageUrl2: String = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/visibility.png"
  eyeImageUrl3: String = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/visibility.png"
  loadingStatus: any
  errorMsg:any

  newPasswordStrengthStatus:boolean = false
  confirmPasswordStrengthStatus:boolean = false
  public barLabel: string = "Password strength:";
  constructor(UserService:UserService) {
    this.userID = "61d59e7999dc1f31177898ba"
    this.UserService = UserService
    this.typeInput1 = "password"
    this.typeInput2 = "password"
    this.typeInput3 = "password"
    this.loadingStatus = true

  }

  ngOnInit(): void {
    this.getUser()
  }

  changeThePassword() {
    this.wrongPassword = true
    this.mismatch = true
    this.loadingStatus = false
    if(this.newPasswordStrengthStatus && this.confirmPasswordStrengthStatus){
      if(this.checkCurrentPassword(this.currentPassword.value)){
        this.wrongPassword = true
        if(this.confirmPassword.value === this.newPassword.value) {
          this.mismatch = true
          this.UserService.changeUserPassword(this.userID,this.newPassword.value).subscribe({
            next:value=>
            {
              alert("password updated")
              this.getUser()
              this.loadingStatus = true
              this.currentPassword.setValue("")
              this.newPassword.setValue("")
              this.confirmPassword.setValue("")
            }
            ,
            error:error => {
              console.log(error)
              this.loadingStatus = true
            }
          } )
        }else{
          this.errorMsg = "Password mismatch!"
          this.mismatch = false
          this.loadingStatus = true
        }

      }else{
        this.wrongPassword = false
        this.loadingStatus = true
      }
    }else{
      this.errorMsg = "Password is weak!"
      this.mismatch = false
      this.loadingStatus = true
    }


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

  checkCurrentPassword(currentPassword:String):boolean{
   return bcrypt.compareSync(currentPassword,this.User.Password)
  }

  toggleEye(input:Number) {
    switch (input) {
      case 0 :
        if(this.typeInput1 == "text"){
          this.typeInput1 = "password"
          this.eyeImageUrl1 = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/visibility.png"
        }else{
          this.typeInput1 = "text"
          this.eyeImageUrl1 = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/open.png"
        }
        break
      case 1 :
        if(this.typeInput2 == "text"){
          this.typeInput2 = "password"
          this.eyeImageUrl2 = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/visibility.png"
        }else{
          this.typeInput2 = "text"
          this.eyeImageUrl2 = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/open.png"
        }
        break
      case 2 :
        if(this.typeInput3 == "text"){
          this.typeInput3 = "password"
          this.eyeImageUrl3 = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/visibility.png"
        }else{
          this.typeInput3 = "text"
          this.eyeImageUrl3 = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/open.png"
        }
        break
    }


  }


  checkNewPasswordStrength($event:any){
    console.log($event.idx)
    if($event.idx >= 5){
      this.newPasswordStrengthStatus = true
    }
  }
  checkConfirmPasswordStrength($event:any){
    console.log($event.idx)
    if($event.idx >= 5){
      this.confirmPasswordStrengthStatus = true
    }
  }

  keyDownHandler(event: any) {
    if (event.which === 32)
      event.preventDefault();
  }
}
