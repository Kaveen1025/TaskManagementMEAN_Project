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

  typeInput2: String
  eyeImageUrl2: String = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/visibility.png"

  UserService: UserService
  Username : any = new FormControl('')
  Password : any = new FormControl('')

  err1:boolean = true
  err2:boolean = true
  ErrorMessage: any
  ErrorMessageStatus:boolean

  uname = true
  pass = true
  errorr=true

  flagName1 = true;
  flagName2 = true;
  confirm = true;

  constructor( private http : HttpClient,public fb: FormBuilder, UserService:UserService,private modalService: NgbModal) {
    this.UserService = UserService
    this.ErrorMessageStatus = true
    this.typeInput2 = "password"
  }

  ngOnInit(): void {

  }

  // checkvalidity(){
  //   if(this.Username.length < 1 && this.Password.length<1){
  //     this.flagName1 = false
  //     this.flagName2 = false
  //   }else if(this.Username.length < 1 ){
  //     this.flagName1 = false
  //   }else if(this.Password.length < 1 ){
  //     this.flagName2 = false
  //   } else{
  //     this.flagName1 = true
  //     this.flagName2 = true
  //   }
  // }

  login(){

      let detailsObject = {
        Username: this.Username.value,
        Password: this.Password.value,
      }
      // this.checkvalidity()

      this.UserService.login(detailsObject).subscribe((post: any) => {
        console.log(post)
        console.log(detailsObject)

        if (post == "Customer Sign In Successfully") {
          alert("Success")
        } else if (post == "Invalid Credentials") {
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
    // }
  }

  openVerticallyCentered() {
    this.modalService.open(this.modalContent, { centered: true});
  }
  openVerticallyCentered2() {
    this.modalService.open(this.modalContent2, { centered: true});
  }

  triggerErrorMessage(msg:any){
    this.ErrorMessage = msg
    this.ErrorMessageStatus = false
  }

  toggleEye(input:Number) {
    if(this.typeInput2 == "text"){
      this.typeInput2 = "password"
      this.eyeImageUrl2 = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/visibility.png"
    }else{
      this.typeInput2 = "text"
      this.eyeImageUrl2 = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/open.png"
    }
  }
}
