import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {WorkspaceService} from "../../services/workspacepage.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('content', {static: true}) modalContent: TemplateRef<any> | undefined
  @ViewChild('content2', {static: true}) modalContent2: TemplateRef<any> | undefined

  // public form! : FormGroup
  UserService: UserService
  Username : String =""
  Password : String =""

  err1:boolean = true
  err2:boolean = true
  ErrorMessage: any
  ErrorMessageStatus:boolean

  uname = true
  pass = true
  // logbtn = true

  ErrorMessage: any
  ErrorMessageStatus:boolean

  errorr=true

  flagName1 = false;
  flagName2 = false;
  confirm = true;

  // detailsObject : any



  constructor( private http : HttpClient,public fb: FormBuilder, UserService:UserService,private modalService: NgbModal) {
    this.UserService = UserService
    this.ErrorMessageStatus = true

  }


  ngOnInit(): void {

    // this.form = this.fb.group({
    //   Username:['',Validators.required],
    //   Password:['',Validators.required],
    // })
  }

  // login(){
  //   let detailsObject = {
  //     Username: this.Username,
  //     Password: this.Password,
  //   }
  //
  //   this.UserService.login(this.detailsObject).subscribe((post: any)=> {
  //     console.log(post)
  //     console.log(this.detailsObject)
  //   });
  // }

  checkvalidity(){
    if(this.Username.length < 1 && this.Password.length<1){
      this.flagName1 = true
      this.flagName2 = true
    }else if(this.Username.length < 1 ){
      this.flagName1 = true
    }else if(this.Password.length < 1 ){
      this.flagName2 = true
    } else{
      this.flagName1 = false
      this.flagName2 = false
      this.confirm = false
    }
  }

  login(){
    if(this.flagName1 == true || this.flagName2 == true ){
      // this.checkvalidity()
    }
    else {
      let detailsObject = {
        Username: this.Username,
        Password: this.Password,
      }
      this.checkvalidity()

      this.UserService.login(detailsObject).subscribe((post: any) => {
        console.log(post)
        console.log(detailsObject)

        if (post == "Customer Sign In Successfully") {
          alert("Success")
        } else if (post == "Invalid Credentials") {
          // alert(post)
          // this.errorr = false
          this.err1 = false
          this.openVerticallyCentered()
        } else {
          this.err2 = false
          this.err1 = true
          this.openVerticallyCentered2()
        }
      }, error => {
        console.log(error);
      });

    }


  }
  openVerticallyCentered() {
    // console.log(this.modalContent);
    this.modalService.open(this.modalContent, { centered: true});
  }
  openVerticallyCentered2() {
    // console.log(this.modalContent);
    this.modalService.open(this.modalContent2, { centered: true});
  }

  // login() {
  //   this.http.post("http://localhost:8070/user/loginUser",this.form.value)
  //     .subscribe(res=>{
  //       alert("login success")
  //       this.form.reset();
  //       // const user= res.find((a:any)=>{
  //       //   return a.Username === this.loginForm.value.username && a.Password === this.loginForm.value.password
  //       // });
  //       // if(user){
  //       //   alert("login success")
  //       //   this.loginForm.reset();
  //       // }else{
  //       //   alert('user not found')
  //       // }
  //
  //     },err=>{
  //       alert('something went wrong!')
  //
  //     })
  // }



  triggerErrorMessage(msg:any){
    this.ErrorMessage = msg
    this.ErrorMessageStatus = false
  }

}
