import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-workspacemodal',
  templateUrl: './project-workspacemodal.component.html',
  styleUrls: ['./project-workspacemodal.component.css']
})
export class ProjectWorkspacemodalComponent implements OnInit {
  displayStyle = "none";
  constructor() {


  }



  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  ngOnInit(): void {
  }

}
