import { Injectable} from "@angular/core";
import {Subject} from 'rxjs'
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class FriendspageService{

  constructor(private httpClient: HttpClient) {
  }

  // private name: string = "";
  // private description: string = "";
  // private deadline: string = "";
  // private profileimg: string = "";
  // private backgroundimg: string = "";
  // private members: string[] = [];
  //
  //
  // setData(name: string, description: string, deadline: string, profileimg: string, backgroundimg: string, members: []){
  //   this.name = name;
  //   this.description = description;
  //   this.deadline = deadline;
  //   this.profileimg = profileimg;
  //   this.backgroundimg = backgroundimg;
  //   this.members = members;
  // }

  getAllUsers(userID: string){
    return this.httpClient.get("http://localhost:8070/user/getFriendRequestDetails/"+userID)
  }

  deleteFriendRequest(userID: string, friendID: string){
    return this.httpClient.delete("http://localhost:8070/user/removefriendReqsts/"+userID+ "/"+friendID)
  }

  deleteRequestedFriend(userID: string, friendID: string){
    return this.httpClient.delete("http://localhost:8070/user/removefriendReq/"+userID+ "/"+friendID)
  }

  addFriendToUser(userID: string, friendID: string){
    // @ts-ignore
    return this.httpClient.put("http://localhost:8070/user/addfriend/"+userID+ "/"+friendID)

  }
  // getWorkspaceData(workspaceID: string){
  //   return this.httpClient.get("http://localhost:8070/workspace/getWorkspaceByID/"+workspaceID)
  //
  // }


}
