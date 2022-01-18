import {Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-confirmdeletemodal',
  templateUrl: './confirmdeletemodal.component.html',
  styleUrls: ['./confirmdeletemodal.component.css']
})
export class ConfirmdeletemodalComponent implements OnInit {

  @Output() someEvent = new EventEmitter<string>();

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalService.dismissAll();
  }


  confirmDelete() {
    // @ts-ignore
    this.someEvent.emit()
    this.closeModal()
  }

}
