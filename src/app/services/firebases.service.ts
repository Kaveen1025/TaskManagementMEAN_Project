import {Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {FileUpload} from '../module/file-upload';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";

// import firebase from "firebase/compat";

@Injectable({
  providedIn: 'root'
})
export class FirebasesService {
  basePath:any = "UserProfileImages"
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
  }

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  pushToWorkSpaceStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${fileUpload.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  //method to retrieve download url
  // single image
  // give the url with the base path
     getUrl(url:any):any {
       const storageRef = this.storage.ref(url);
       return storageRef.getDownloadURL().subscribe(downloadURL => {
         return downloadURL
       })
     }
}
