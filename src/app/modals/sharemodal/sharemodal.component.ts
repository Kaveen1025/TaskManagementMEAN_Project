import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-sharemodal',
  templateUrl: './sharemodal.component.html',
  styleUrls: ['./sharemodal.component.css']
})
export class SharemodalComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true, size: 'lg'  });
  }

  closeModal(content: any) {
    this.modalService.dismissAll(content);
  }

  saveDetails(content: any) {
    this.modalService.dismissAll(content);
  }

}
