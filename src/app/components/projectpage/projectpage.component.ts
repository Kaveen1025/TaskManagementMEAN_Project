import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-projectpage',
  templateUrl: './projectpage.component.html',
  styleUrls: ['./projectpage.component.css']
})
export class ProjectpageComponent implements OnInit {

  // accessing the template
  @ViewChild('content') private content: TemplateRef<any> | undefined;

  constructor( private modalService: NgbModal) { }

  ngOnInit(): void {
  }


  CreateProject() {
    this.modalService.open(this.content, { centered: true, size:"lg" }, );
  }

}
