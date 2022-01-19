import {Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-confirmmodal',
  templateUrl: './confirmmodal.component.html',
  styleUrls: ['./confirmmodal.component.css']
})
export class ConfirmmodalComponent implements OnInit {

  @ViewChild('content2') private content: TemplateRef<any> | undefined;
  @Output() someEvent = new EventEmitter<string>();
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }


  closeModal() {
    this.modalService.dismissAll(this.content);
  }


  saveDetails() {
    // @ts-ignore
    this.someEvent.emit()
    this.closeModal()
  }
}
