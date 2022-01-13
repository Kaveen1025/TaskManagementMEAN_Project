import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { TemplateRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-errormodal',
  templateUrl: './errormodal.component.html',
  styleUrls: ['./errormodal.component.css']
})
export class ErrormodalComponent implements OnInit {
  // can access the template using following code
  @ViewChild('content') private content: TemplateRef<any> | undefined;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openVerticallyCentered() {
    this.modalService.open(this.content, { centered: true });
  }

  closeModal() {
    this.modalService.dismissAll(this.content);
  }

  saveDetails(content: any) {
    this.modalService.dismissAll(content);
  }

}
