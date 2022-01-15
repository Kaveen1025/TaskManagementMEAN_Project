import { Component, OnInit } from '@angular/core';
import { UserService} from "../../services/user.service";
import {FormGroup, FormControl, Validators, NgForm} from "@angular/forms";

@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.css']
})
export class SignuppageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
}
