import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-loginerr',
  templateUrl: './loginerr.component.html',
  styleUrls: ['./loginerr.component.css']
})
export class LoginerrComponent implements OnInit {

  @Input() text1: string | undefined;
  @Input() text2: string | undefined;

  @ViewChild('content') private content: TemplateRef<any> | undefined;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }


  closeModal() {
    this.modalService.dismissAll(this.content);
  }

}
