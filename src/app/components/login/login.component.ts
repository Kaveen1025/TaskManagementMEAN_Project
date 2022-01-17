import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // public form! : FormGroup
  UserService: UserService
  Username : String =""
  Password : String =""

  // detailsObject : any


  constructor( private http : HttpClient,public fb: FormBuilder, UserService:UserService) {
    this.UserService = UserService

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

  login(){
    let detailsObject = {
      Username: this.Username,
      Password: this.Password,
    }

    this.UserService.login(detailsObject).subscribe((post: any)=> {
      console.log(post)
      console.log(detailsObject)


        if(post.length!==null){
          alert('login Successful')

        }
        else{
          console.log('unavailable')
        }

    }, error => {
      console.log(error);
    });

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




}
