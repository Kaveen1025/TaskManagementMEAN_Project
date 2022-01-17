import { Component, OnInit } from '@angular/core';
import {GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-googlesignup',
  templateUrl: './googlesignup.component.html',
  styleUrls: ['./googlesignup.component.css']
})
export class GooglesignupComponent implements OnInit {

  UserService: UserService

  constructor(UserService:UserService,private socialAuthService: SocialAuthService) {
    this.UserService = UserService
  }

  ngOnInit(): void {
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user =>{
      console.log(user)
      console.log(new Date().valueOf())
    });

  }

  logOut(): void {
    this.socialAuthService.signOut();
  }
}
