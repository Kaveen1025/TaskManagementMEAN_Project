import { Injectable} from "@angular/core";
import {Subject} from 'rxjs'
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class AvatargroupService{

  constructor(private httpClient: HttpClient) {
  }

  getAllMembers(projectID: string){
    return this.httpClient.get("http://localhost:8070/project/getMemberDetails/"+projectID)
  }


}
