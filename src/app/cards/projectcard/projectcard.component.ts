import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-projectcard',
  templateUrl: './projectcard.component.html',
  styleUrls: ['./projectcard.component.css']
})
export class ProjectcardComponent implements OnInit {

  constructor() { }
  title: string = "";
  description: string = "";
  mainImg: string = "";
  coverImg: string = "";
  deadLine: string = "";
  projectID: string = "";


  @Input() projectDetails: any;

  ngOnInit(): void {
    console.log(this.projectDetails.MemberIDs);
    this.title = this.projectDetails.projectName;
    this.description = this.projectDetails.Description;
    this.mainImg = this.projectDetails.MainImage;
    this.coverImg = this.projectDetails.CoverImage;
    this.deadLine = this.projectDetails.Deadline;
    this.projectID = this.projectDetails._id;

  }


}
