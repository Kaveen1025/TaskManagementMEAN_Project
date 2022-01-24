import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectinvService {

  constructor(private http: HttpClient) { }


  fetchInvitations(id:String){
    return this.http.get(environment.apiBaseUrl+"projectinv/get/" + id);
  }


  //Check for a member
  checkInvitation(projectID:any, userID:any){
    return this.http.get(environment.apiBaseUrl + 'projectinv/checkMember/' + projectID + "/" + userID);
  }
}
