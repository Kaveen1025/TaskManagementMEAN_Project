import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  addProject(data:any){
    return this.http.post(environment.apiBaseUrl+"project/add", data);
  }

  fetchProject(id:String){
    return this.http.get(environment.apiBaseUrl+"project/get/" + id);
  }

  editProject(id:String , data:any){
    return this.http.put(environment.apiBaseUrl+"project/edit/" + id, data);
  }

  deleteProject(id:String){
    return this.http.delete(environment.apiBaseUrl + "project/deleteproject/" + id);
  }

  fetchProjectbyName(name:String){
    return this.http.get(environment.apiBaseUrl+"project/getbyname/"+ name);
  }

  //Remove Project
  removeProject(projectID: any){
    return this.http.delete(environment.apiBaseUrl+"project/deleteproject/"+ projectID);
  }

  //Check for a member
  checkInvitation(projectID:any, userID:any){
    return this.http.get(environment.apiBaseUrl + 'project/checkMember/' + projectID + "/" + userID);
  }
}


