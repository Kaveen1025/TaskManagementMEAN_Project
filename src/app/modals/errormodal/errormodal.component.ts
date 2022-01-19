import { Component, OnInit, Input } from '@angular/core';
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



  closeModal() {
    this.modalService.dismissAll(this.content);
  }



}
