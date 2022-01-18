import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WorkspaceservicesService {

  constructor(private http: HttpClient) {

  }


  addWorkspace(data:any){
    return this.http.post(environment.apiBaseUrl+"workspace/create", data);
  }

  addProject(workspaceid:string, projectid:any){
    return this.http.put(environment.apiBaseUrl + "workspace/addProject/" + workspaceid + "/" + projectid, "")
  }

  getByName(name:any){
    return this.http.get(environment.apiBaseUrl + "workspace/getbyname/" + name);
  }


}
