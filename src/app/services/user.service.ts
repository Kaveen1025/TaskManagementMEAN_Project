import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {

  }
  getUser(userID:String){
    return this.http.get(environment.apiBaseUrl + 'user/get/'+userID)
  }

  changeUserPassword(userID:String,newPassword:any){
    let content = {
      Password: newPassword,
    }
    return this.http.put(environment.apiBaseUrl + 'user/updatePassword/'+userID,content)
  }

  getUserWorkspaces(userID:String){

    return this.http.get(environment.apiBaseUrl + 'user/getWorkspaceDetails/'+userID)
  }

  updateUserDetails(userID:String,content:any){
    return this.http.put(environment.apiBaseUrl + 'user/updateDetails/'+userID, content);
  }

  deleteUser(id:String){
    return this.http.delete(environment.apiBaseUrl + 'user/delete/'+id);
  }

  updateUserProfileImage(userID:String,content:any){
    return this.http.put(environment.apiBaseUrl + 'user/updateUserProfile/'+userID, content);
  }


}
