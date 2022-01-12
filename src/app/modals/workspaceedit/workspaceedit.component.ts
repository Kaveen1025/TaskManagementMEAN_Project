import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-workspaceedit',
  templateUrl: './workspaceedit.component.html',
  styleUrls: ['./workspaceedit.component.css']
})
export class WorkspaceeditComponent implements OnInit  {

  constructor(private modalService: NgbModal) { }


  workspacename: string = "";
  coverimage: string = "";
  mainimage: string = "";
  description: string = "";
  object1: {} = {};

  ngOnInit(): void {
  }
  openVerticallyCentered(content: any) {
    alert("asd")

    // var myElement = angular.element( document.querySelector( '#content' ) );
    // console.log(data);
    this.modalService.open(content, { centered: true, size : "lg"});
  }

  closeModal(content: any) {
    this.modalService.dismissAll(content);
  }

  saveDetails(content: any) {
    this.modalService.dismissAll(content);
  }

  testFunction(){
    alert("asdas")
  }

  editworkspace(){
    let object2 = {
      workspacename: this.workspacename
    }

    console.log("Workspace name : "+ this.workspacename);
    console.log("Description : "+ this.description)
    console.log("Cover Image : "+ this.coverimage);
    console.log("Main Image : "+ this.mainimage);


  }

}
