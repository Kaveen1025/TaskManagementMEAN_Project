import { Component, OnInit } from '@angular/core';
import {ContactusService} from "../../services/contactus.service";
import {FormGroup, FormControl, Validators, NgForm} from "@angular/forms";

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  // firstName: string = "";
  // lastName: string = "";
  // email: string = "";
  // phoneNumber: string = "";
  // message: string = "";



  firstName = new FormControl('');
  lastName = new FormControl('');
  email = new FormControl('');
  phoneNumber = new FormControl('');
  message = new FormControl('');



  constructor(private contactusService: ContactusService) {

  }


  ngOnInit(): void {

  }

  saveMessage(contactForm: NgForm){

    let object2 = {

      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      phoneNumber: this.phoneNumber.value,
      message: this.message.value
    }

    console.log(object2)
    this.contactusService.contact(object2).subscribe((post: any)=> {
      // this.firstName.setValue("");
      // this.lastName.setValue("");
      // this.email.setValue("");
      // this.phoneNumber.setValue("");
      // this.message.setValue("");

      alert("Success");
      location.reload();
      console.log("Success");
      // console.log(this.projectObject[0]);
    }, error => {
      console.log(error);
    });


  }

}

