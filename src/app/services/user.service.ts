import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {

  }

  createUser(data:any){
    return this.http.post(environment.apiBaseUrl + 'user/add', data);
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

  login(detailsObject:any){
    return this.http.post('http://localhost:8070/user/loginUser',detailsObject);
  }

  getEmail(email: String){
    return this.http.get('http://localhost:8070/user/getUser/'+email);
  }
  //Add a project to the user
  addProject(userID:any, projectID:any){
    return this.http.put(environment.apiBaseUrl+'user/addproject/' + userID + "/" + projectID, "")
  }

  //Add Workspace to the User
  addWorkspace(userID:any, workspaceID:any){
    return this.http.put(environment.apiBaseUrl+'user/addworkspace/' + userID + "/" + workspaceID, "")
  }

  // check whether username is already exist or not
  checkUsername(userName:String){
    return this.http.get(environment.apiBaseUrl + 'user/getUserbyUN/'+userName);
  }


  //Remove Project from user
  removeProject(userID:any, projectID:any){
    return this.http.delete(environment.apiBaseUrl + 'user/removeproject/'+ userID + "/" + projectID);
  }

  //Get all users
  getAllUsers(){
    return this.http.get(environment.apiBaseUrl+'user/getAll');
  }
}
