import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-successmodal',
  templateUrl: './successmodal.component.html',
  styleUrls: ['./successmodal.component.css']
})
export class SuccessmodalComponent implements OnInit {

  @ViewChild('content') private content: TemplateRef<any> | undefined;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }



  closeModal() {
    this.modalService.dismissAll(this.content);
  }


}
