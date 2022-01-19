import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';


// import Cotter from 'cotter';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {


  @ViewChild('content') private content: TemplateRef<any> | undefined;
  @ViewChild('content2') private content2: TemplateRef<any> | undefined;
  @ViewChild('content3') private content3: TemplateRef<any> | undefined;
  @ViewChild('content4', {static: true}) modalContent4: TemplateRef<any> | undefined

  email : String =""
  User:any

  display1 = true
  display2 = false
  display3 = false

  code : String ="1234"
  userID : String =""
  errorMsg:any
  errMsg:any

  newPassword = new FormControl('');
  confirmPassword = new FormControl('');
  loadingStatus: any

  typeInput1: String
  typeInput2: String
  typeInput3: String
  eyeImageUrl1: String = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/visibility.png"
  eyeImageUrl2: String = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/visibility.png"
  eyeImageUrl3: String = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/visibility.png"

  newPasswordStrengthStatus:boolean = false
  confirmPasswordStrengthStatus:boolean = false

  mismatch: boolean = true;
  invalid: boolean = true;

  err1:boolean = true

  public barLabel: string = "Password strength:";

  UserService:UserService
  user: any
  success = false;
  payload = null;
  payloadString = null;
  verifycode: any;

  // emailText : String = "Here's the confirmation code to reset your password"




  constructor(private http : HttpClient,public fb: FormBuilder, UserService:UserService,private modalService: NgbModal) {
    this.UserService = UserService
    this.typeInput1 = "password"
    this.typeInput2 = "password"
    this.typeInput3 = "password"
    this.loadingStatus = true
  }

  ngOnInit(): void {
    // var cotter = new Cotter(API_KEY_ID);
    // cotter
    //   .signInWithLink()
    //   .showEmailForm()
    //   .then((payload: object) => {
    //     this.success = true;
    //     // @ts-ignore
    //     this.payload = payload;
    //     // @ts-ignore
    //     this.payloadString = JSON.stringify(payload, null, 4);
    //   })
    //   .catch((err: any) => console.log(err));
  }

  makeid(length:any) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getEmail(e:Event){
    this.UserService.getEmail(this.email).subscribe((post: any)=> {


      console.log(post)

      if(post!=""){
        alert("abc")

        let a= post[0]

        this.userID = a._id
        console.log(this.userID)

        this.getUser()
          this.display1=false
          this.display2=true

          var codeMail = {
            email: "tharindudeshan50@gmail.com",
            message: "1234"
          }
          console.log(codeMail)

        // public sendEmail(e: Event) {
        //     e.preventDefault();
            // @ts-ignore
          emailjs.sendForm('service_9hfbzyd', 'template_bwhg6jb', codeMail, 'user_4ruC7f7ekFCVHV5AxCzHw')
              .then((result: EmailJSResponseStatus) => {
                console.log(result.text);
              }, (error) => {
                console.log(error.text);
              });
          // }


      }
      else{
        // alert('dfg')
        this.err1 = false
        this.openVerticallyCentered4()
      }

      // console.log(this.email)
      // console.log(post[0].Email)
      //
      // // let [i] = post
      // let a= post[0]
      // console.log(a.Email)
      // console.log(post.length)
      //
      // this.userID = a._id
      // console.log(this.userID)
      //
      // this.getUser()

      // if (post[0].length !== null) {
      //   console.log('Success')
      //   this.display1=false
      //   this.display2=true
      //
      //   var codeMail = {
      //     email: "tharindudeshan50@gmail.com",
      //     message: "1234"
      //   }
      //   console.log(codeMail)
      //
      // // public sendEmail(e: Event) {
      // //     e.preventDefault();
      //     // @ts-ignore
      //   emailjs.sendForm('service_9hfbzyd', 'template_bwhg6jb', codeMail, 'user_4ruC7f7ekFCVHV5AxCzHw')
      //       .then((result: EmailJSResponseStatus) => {
      //         console.log(result.text);
      //       }, (error) => {
      //         console.log(error.text);
      //       });
      //   // }

      //   }
      // else {
      //     alert('Invalid Email')
      //   this.err1 = false
      //   }

    },err=>{
      console.log(err)
    });
  }



  verifyCode() {
    if(this.verifycode === this.code){
      console.log('success')
      this.display1=false
      this.display2=false
      this.display3=true
    }
    else{
      // alert('invalid code')
      this.errMsg = "Invalid Code"
      this.loadingStatus = true
      this.invalid = false
      // this.display2=false
      // this.display1=true;
      // this.display3=false
    }
  }

  openVerticallyCentered4() {
    this.modalService.open(this.modalContent4, { centered: true});
  }

  changeThePassword() {
    this.mismatch = true
    this.loadingStatus = false
    if(this.newPasswordStrengthStatus && this.confirmPasswordStrengthStatus){

        if(this.confirmPassword.value === this.newPassword.value) {
          this.mismatch = true
          this.UserService.changeUserPassword(this.userID,this.newPassword.value).subscribe({
            next:value=>
            {
              alert("password updated")
              // this.getUser()
              this.loadingStatus = true
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
      this.errorMsg = "Password is weak!"
      this.mismatch = false
      this.loadingStatus = true
    }
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

  checkNewPasswordStrength($event:any){
    console.log($event.idx)
    this.newPasswordStrengthStatus = $event.idx >= 4;
  }
  checkConfirmPasswordStrength($event:any){
    console.log($event.idx)
    this.confirmPasswordStrengthStatus = $event.idx >= 4;
  }

  keyDownHandler(event: any) {
    if (event.which === 32)
      event.preventDefault();
  }

  changePasswordFromDB(){
    this.loadingStatus = false
    this.UserService.changeUserPassword(this.userID,this.newPassword.value).subscribe({
      next:value=>
      {
        alert("password updated")
        this.modalService.open(this.content2, { centered: true });
        this.getUser()
        this.loadingStatus = true
        this.newPassword.setValue("")
        this.confirmPassword.setValue("")
      }
      ,
      error:error => {
        console.log(error)
        this.loadingStatus = true
        this.modalService.open(this.content3, { centered: true });
      }
    } )
  }
}



