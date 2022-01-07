import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-centermodal',
  templateUrl: './centermodal.component.html',
  styleUrls: ['./centermodal.component.css']
})
export class CentermodalComponent implements OnInit {

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
