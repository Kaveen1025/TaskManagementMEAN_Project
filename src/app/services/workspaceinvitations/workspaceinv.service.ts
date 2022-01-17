import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WorkspaceinvService {

  constructor(private http: HttpClient) {


  }

  fetchInvitations(id:String){
    return this.http.get(environment.apiBaseUrl+"workspaceinvitation/getWorkspaceInvitationsaccoUser/" + id);
  }
}
