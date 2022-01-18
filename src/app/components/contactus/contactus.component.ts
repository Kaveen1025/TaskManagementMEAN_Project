import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ContactusService} from "../../services/contactus.service";
import {FormGroup, FormControl, Validators, NgForm} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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


  // accessing the template
  @ViewChild('content') private content: TemplateRef<any> | undefined;

  @ViewChild('content3') private content3: TemplateRef<any> | undefined;

  constructor(private modalService: NgbModal, private contactusService: ContactusService) {

  }


  ngOnInit(): void {

  }

  closeAnimation(){
    this.modalService.dismissAll(this.content3);
  }


  saveMessage(contactForm: NgForm){

this.modalService.open(this.content3, {centered: true},);

    let object2 = {

      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      phoneNumber: this.phoneNumber.value,
      message: this.message.value
    }

    console.log(object2);

    this.contactusService.contact(object2).subscribe((post: any)=> {
      // alert("Success");
      this.closeAnimation();

      this.modalService.open(this.content, {centered: true},);


      console.log("Success");

      window.setTimeout(function(){location.reload()},2700);


      // console.log(this.projectObject[0]);
    }, error => {
      console.log(error);
    });


  }

}

