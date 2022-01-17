import { Component, OnInit } from '@angular/core';
import { UserService} from "../../services/user.service";
import {FormGroup, FormControl, Validators, NgForm} from "@angular/forms";

@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.css']
})
export class SignuppageComponent implements OnInit {

password1 : string = '';
  password2 : string = '';

  Username = new FormControl('');
  Email = new FormControl('');
  FirstName = new FormControl('');
  LastName = new FormControl('');
  Password = new FormControl('');
  ConfirmPassword = new FormControl('');


  show1 = false;
  show2 = false;


  constructor(private userService: UserService) { }


  ngOnInit(): void {

    this.password1 = 'password';
    this.password2 = 'password';


  }

  onClick() {

    if (this.password1 === 'password') {
      this.password1 = 'text';
      this.show1 = true;
    } else {
      this.password1 = 'password';
      this.show1 = false;
    }
  }

  onClickk() {

    if (this.password2 === 'password') {
      this.password2 = 'text';
      this.show2 = true;
    } else {
      this.password2 = 'password';
      this.show2 = false;
    }
  }



  addUser(signUpForm: NgForm){

    let object2 = {

      Username: this.Username.value,
      Email: this.Email.value,
      FirstName: this.FirstName.value,
      LastName: this.LastName.value,
      Password: this.Password.value

    }

    console.log(object2)
    this.userService.createUser(object2).subscribe((post: any)=> {

      this.Username.setValue("");
      this.Email.setValue("");
      this.FirstName.setValue("");
      this.LastName.setValue("");
      this.Password.setValue("");
      this.ConfirmPassword.setValue("");


      alert("Success");
      // location.reload();
      console.log("Success");
      // console.log(this.projectObject[0]);
    }, error => {
      console.log(error);
    });


  }


}
