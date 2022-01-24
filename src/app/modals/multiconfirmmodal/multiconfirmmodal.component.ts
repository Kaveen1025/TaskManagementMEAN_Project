import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-multiconfirmmodal',
  templateUrl: './multiconfirmmodal.component.html',
  styleUrls: ['./multiconfirmmodal.component.css']
})
export class MulticonfirmmodalComponent implements OnInit {

  @ViewChild('content2') private content: TemplateRef<any> | undefined;
  @Output() someEvent = new EventEmitter<string>();
  @Input() text: string = "";
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
