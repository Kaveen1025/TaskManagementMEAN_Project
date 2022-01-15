import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-successmodal',
  templateUrl: './successmodal.component.html',
  styleUrls: ['./successmodal.component.css']
})
export class SuccessmodalComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }


  closeModal() {
    this.modalService.dismissAll();
  }

  saveDetails(content: any) {
    this.modalService.dismissAll(content);
  }

}
