import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({

  providedIn: 'root'
})
export class ContactusService {

  constructor(private http: HttpClient) { }

  contact(data:any){
    return this.http.post(environment.apiBaseUrl + 'user/add', data);
  }

}
