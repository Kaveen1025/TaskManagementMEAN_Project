import { Injectable} from "@angular/core";
import {Subject} from 'rxjs'
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class WorkspaceService{

  constructor(private httpClient: HttpClient) {
  }

  private name: string = "";
  private description: string = "";
  private deadline: string = "";
  private profileimg: string = "";
  private backgroundimg: string = "";
  private members: string[] = [];


  setData(name: string, description: string, deadline: string, profileimg: string, backgroundimg: string, members: []){
    this.name = name;
    this.description = description;
    this.deadline = deadline;
    this.profileimg = profileimg;
    this.backgroundimg = backgroundimg;
    this.members = members;
  }

  getAllProjects(workspaceID: string){
    return this.httpClient.get("http://localhost:8070/workspace/getProjectDetails/"+workspaceID)
  }


}
