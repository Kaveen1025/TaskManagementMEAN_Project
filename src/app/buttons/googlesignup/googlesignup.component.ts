import {Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {UserService} from "../../services/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-googlesignup',
  templateUrl: './googlesignup.component.html',
  styleUrls: ['./googlesignup.component.css']
})
export class GooglesignupComponent implements OnInit {

  UserService: UserService
  User:any
  newUsername:String = ""
  UserFromDB:any
  @ViewChild('content') private content: TemplateRef<any> | undefined;
  @ViewChild('content2') private content2: TemplateRef<any> | undefined;

  @Output() event = new EventEmitter();
  constructor(UserService:UserService,private socialAuthService: SocialAuthService,private modalService: NgbModal) {
    this.UserService = UserService
  }

  ngOnInit(): void {

  }

  loginWithGoogle(): void {

    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user =>{
      this.User = user
      console.log(this.User)
      this.triggerLoading()
      this.generateUsername()
      this.checkAuthentication()
    });

  }

  logOut(): void {
    this.socialAuthService.signOut().then(r => {

    });
  }

  checkAuthentication(): void {
    this.UserService.getEmail(this.User.email).subscribe({
      next:value=>
      {

              if(value == ""){
                // there are no accounts form this email
                this.createAccount()
              }else{
                  this.UserFromDB = value
                if(this.UserFromDB[0].GoogleSignIn){
                  // login to the system (redirect to the workspace page)
                  // save userid in local storage
                  alert("login success")
                  this.closeModal()
                }else{
                  // display an error message about email already exist
                  this.closeModal()
                  this.event.emit()
                }
              }
      }
      ,
      error:error => {
        console.log(error)
        this.triggerErrorModal()
      }
    } )
  }

  generateUsername(){
    let tempUsername = this.User.name.replace(/\s/g, '') + String(new Date().valueOf()).substring(0,3)
    this.UserService.checkUsername(tempUsername).subscribe({
      next:value=>
      {
        if(value){
          this.generateUsername()
        }else{
          this.newUsername = tempUsername
        }
      }
      ,
      error:error => {
        console.log(error)
      }
    } )
  }

  createAccount(){
    let NewUser = {
      Username : this.newUsername,
      Email : this.User.email,
      FirstName : this.User.firstName,
      LastName : this.User.lastName,
      Password : this.User.id,
      GoogleSignIn : true,
      ProfileImage : this.User.photoUrl
    }
    //console.log(User)
    this.UserService.createUser(NewUser).subscribe({
      next:value=>
      {
        alert("new account created")
        // save userid in local storage
        // (redirect to the workspace page)
        this.closeModal()
      }
      ,
      error:error => {
        console.log(error)
        this.triggerErrorModal()
      }
    } )
  }

  triggerLoading(){
    this.modalService.open(this.content, { centered: true ,backdrop : "static"});
  }

  triggerErrorModal(){
    this.modalService.open(this.content2, { centered: true});
  }

  closeModal(){
    this.modalService.dismissAll()
  }
}
