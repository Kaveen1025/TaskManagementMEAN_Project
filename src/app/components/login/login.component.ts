import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form! : FormGroup

  constructor( private http : HttpClient,public fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      Username:['',Validators.required],
      Password:['',Validators.required],
    })
  }


  login() {
    this.http.post("http://localhost:8070/user/loginUser",this.form.value)
      .subscribe(res=>{
        alert("login success")
        this.form.reset();
        // const user= res.find((a:any)=>{
        //   return a.Username === this.loginForm.value.username && a.Password === this.loginForm.value.password
        // });
        // if(user){
        //   alert("login success")
        //   this.loginForm.reset();
        // }else{
        //   alert('user not found')
        // }
      },err=>{
        alert('something went wrong!')
      })
  }

}
