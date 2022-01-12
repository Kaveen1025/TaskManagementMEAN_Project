import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>()
  @Input() firstName : String | undefined
  @Input() lastName : String | undefined
  @Input() email : String | undefined
  constructor() { }

  ngOnInit(): void {
  }

  redirectToChangePasswordPage() {
    this.newItemEvent.emit('false')
  }
}
