import {Component, Input, OnInit} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-projectcard',
  templateUrl: './projectcard.component.html',
  styleUrls: ['./projectcard.component.css']
})
export class ProjectcardComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }
  title: string = "";
  description: string = "";
  mainImg: string = "";
  coverImg: string = "";
  deadLine: string = "";
  projectID: string = "";
  projectMainImage: string = "";
  projectMainPlaceHolder: string = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/userPlaceHolder.png"



  @Input() projectDetails: any;

  ngOnInit(): void {
    // console.log(this.projectDetails.MemberIDs);
    this.title = this.projectDetails.projectName;
    this.description = this.projectDetails.Description;
    this.mainImg = this.projectDetails.MainImage;
    this.coverImg = this.projectDetails.CoverImage;
    this.deadLine = this.projectDetails.Deadline;
    this.projectID = this.projectDetails._id;

    this.getProjectMainImage(this.projectDetails.MainImage)

  }

  getProjectMainImage(url:any){
    // alert("asd")
    this.projectMainImage = this.projectMainPlaceHolder
    const storageRef = this.storage.ref(url);
    storageRef.getDownloadURL().subscribe(downloadURL => {
      this.projectMainImage = this.projectMainPlaceHolder
      this.projectMainImage = downloadURL
      console.log("work")
      console.log(this.projectMainImage)

    })
  }

}
