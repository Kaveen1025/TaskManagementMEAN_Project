import { Component, OnInit } from '@angular/core';
import { UserService} from "../../services/user.service";
import {FormGroup, FormControl, Validators, NgForm} from "@angular/forms";

@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.css']
})
export class SignuppageComponent implements OnInit {

  Username = new FormControl('');
  Email = new FormControl('');
  FirstName = new FormControl('');
  LastName = new FormControl('');
  Password = new FormControl('');

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  addUser(contactForm: NgForm){

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


      alert("Success");
      // location.reload();
      console.log("Success");
      // console.log(this.projectObject[0]);
    }, error => {
      console.log(error);
    });


  }


}
