import { Component, OnInit, Input } from '@angular/core';
import {WorkspaceinvService} from "../../services/workspaceinvitations/workspaceinv.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";


@Component({
  selector: 'app-invitationscard',
  templateUrl: './invitationscard.component.html',
  styleUrls: ['./invitationscard.component.css']
})
export class InvitationscardComponent implements OnInit {

  @Input() Sender: any;
  @Input() Workspace: any;
  @Input() Image: any;
  @Input() Time: any;
  @Input() Type: any;
  @Input() Details:any;

  NotificationImagePlaceHolder: string = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/userPlaceHolder.png"

  constructor(private workspaceinvService: WorkspaceinvService, private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    console.log(this.Details);
    this.getNotificationImage(this.Image);
  }


  getNotificationImage(url:any){
    // alert("asd")
    this.Image = this.NotificationImagePlaceHolder
    const storageRef = this.storage.ref(url);
    storageRef.getDownloadURL().subscribe(downloadURL => {

      this.Image= downloadURL
      console.log("work")
      console.log(this.Image);

    })
  }
}
