import {Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-deletedmodal',
  templateUrl: './deletedmodal.component.html',
  styleUrls: ['./deletedmodal.component.css']
})
export class DeletedmodalComponent implements OnInit {
  @ViewChild('content') private content: TemplateRef<any> | undefined;



  @Output() someEvent = new EventEmitter<string>();


  constructor(private modalService: NgbModal) {

  }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalService.dismissAll(this.content);
    this.callParent()
  }

  callParent(): void {
    // @ts-ignore
    this.someEvent.emit({myObj: "Gg wada"});
  }

}
