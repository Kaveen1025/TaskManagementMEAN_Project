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
    return this.http.get(environment.apiBaseUrl + 'student/getStudents')
  }

  changeUserPassword(userID:String,newPassword:any){
    return this.http.put(environment.apiBaseUrl + 'student/getStudents',newPassword)
  }



  // updateStudent(student:any){
  //   return this.http.put(environment.apiBaseUrl + 'student/update/'+student._id, student);
  // }
  //
  // deleteStudent(id:String){
  //   return this.http.delete(environment.apiBaseUrl + 'student/delete/'+id);
  // }


}
