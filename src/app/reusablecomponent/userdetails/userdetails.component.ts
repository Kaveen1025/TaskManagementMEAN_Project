import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  redirectToChangePasswordPage() {
    this.newItemEvent.emit('false')
  }
}
