import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { UserService} from "../../services/user.service";
import {FormGroup, FormControl, Validators, NgForm} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.css']
})
export class SignuppageComponent implements OnInit {

  password1 : string = '';
  password2 : string = '';
  ErrorMessage: any;
  ErrorMessageStatus: boolean = true;
  errormsg: any;

  Username = new FormControl('');
  Email = new FormControl('');
  FirstName = new FormControl('');
  LastName = new FormControl('');
  Password = new FormControl('');
  ConfirmPassword = new FormControl('');
  checkbox = new FormControl('');



  show1 = false;
  show2 = false;
  PasswordStrengthStatus:boolean = false
  ConfirmPasswordStrengthStatus:boolean = false
  public barLabel: string = "Password strength:";
  errorMsg:any;
  mismatch: boolean = true;

  // accessing the template
  @ViewChild('content') private content: TemplateRef<any> | undefined;

  @ViewChild('content3') private content3: TemplateRef<any> | undefined;

  constructor(private modalService: NgbModal, private userService: UserService) { }


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

  keyDownHandler(event: any) {
    if (event.which === 32)
      event.preventDefault();
  }

  checkPasswordStrength($event:any){
    console.log($event.idx)
    this.PasswordStrengthStatus = $event.idx >= 4;
  }

  checkConfirmPasswordStrength($event:any){
    console.log($event.idx)
    this.ConfirmPasswordStrengthStatus = $event.idx >= 4;
  }

  triggerErrorMessage(msg:any){
    this.ErrorMessage = msg
    this.ErrorMessageStatus = false
  }

  closeAnimation(){
    this.modalService.dismissAll(this.content3);
  }




  addUser(signUpForm: NgForm){


    this.modalService.open(this.content3, {centered: true});

    this.mismatch = true

    if(this.PasswordStrengthStatus && this.ConfirmPasswordStrengthStatus){
      if(this.ConfirmPassword.value === this.Password.value) {

        this.mismatch = true

        let object2 = {

          Username: this.Username.value,
          Email: this.Email.value,
          FirstName: this.FirstName.value,
          LastName: this.LastName.value,
          Password: this.Password.value,
          GoogleSignIn: false

        }

        console.log(object2)
        this.userService.createUser(object2).subscribe((post: any)=> {

          if(post == "User Added Successfully!") {

            // alert("Success");
            // location.reload();
            this.errormsg = "";

            this.Username.setValue("");
            this.Email.setValue("");
            this.FirstName.setValue("");
            this.LastName.setValue("");
            this.Password.setValue("");
            this.ConfirmPassword.setValue("");
            this.checkbox.setValue("");

            this.closeAnimation();

            console.log("Success");

            this.modalService.open(this.content, {centered: true},);
          }

          else{
            // alert(post);
            this.errormsg = post;
            this.closeAnimation();
          }
          // console.log(this.projectObject[0]);
        }, error => {
          console.log(error);

        });

      }else{
        this.errorMsg = "Password mismatch!"
        this.mismatch = false

      }

    }else {

      this.errorMsg = "Password is weak!"
      this.mismatch = false

    }


  }


}
