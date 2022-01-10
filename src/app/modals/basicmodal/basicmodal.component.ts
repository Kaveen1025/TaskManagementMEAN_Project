import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-basicmodal',
  templateUrl: './basicmodal.component.html',
  styleUrls: ['./basicmodal.component.css']
})
export class BasicmodalComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  closeModal(content: any) {
    this.modalService.dismissAll(content);
  }

  saveDetails(content: any) {
    this.modalService.dismissAll(content);
  }

}
