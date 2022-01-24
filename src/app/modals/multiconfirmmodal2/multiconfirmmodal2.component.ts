import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-multiconfirmmodal2',
  templateUrl: './multiconfirmmodal2.component.html',
  styleUrls: ['./multiconfirmmodal2.component.css']
})
export class Multiconfirmmodal2Component implements OnInit {

  @ViewChild('content') private content: TemplateRef<any> | undefined;
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
