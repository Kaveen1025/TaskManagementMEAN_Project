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



}
