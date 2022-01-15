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
    return this.http.delete(environment.apiBaseUrl + "project/deleteproject" + id);
  }
}


