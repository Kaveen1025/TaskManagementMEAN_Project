import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import {UserService} from "../../services/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>()
  // @Input() userID : String | undefined

  imagePath: String
  imageURL: String
  public now: Date =  new Date()
  Time:String
  Date:String
  todayDataTime:String
  greetings: String;
  workspaces:  any
  originalWorkspaces: any


  userID:String
  User:any
  UserService:UserService
  notificationCount: Number
  friendRequestCount:Number
  isNotifications: boolean;
  isFriendsRequest: boolean;
  searchResult: any;
  loadingStatus: boolean = false;
  errorMsg: any;
  errorMsgStatus: boolean = true;

  // accessing the template
  @ViewChild('content') private content: TemplateRef<any> | undefined;

  constructor(UserService:UserService, private modalService: NgbModal) {

    this.userID = "61d59e7999dc1f31177898ba"
    this.UserService = UserService
    this.notificationCount = 0
    this.friendRequestCount = 0
    this.isNotifications = true
    this.isFriendsRequest = true

    this.greetings = ""
    this.imagePath = "./assets/images/Dynamic%20Image%20Collection/"
    this.imageURL = ""
    this.todayDataTime = ""
    this.Time = ""
    this.Date = ""
    setInterval(() => {
       this.now = new Date();
       this.todayDataTime = String(this.now)
       this.Time = this.todayDataTime.substring(16, 21)
       this.Date = this.todayDataTime.substring(0,16)
       this.dynamicWallpaper(this.todayDataTime.substring(16,18))
      this.greetingsChange(this.todayDataTime.substring(16,18))
      //this.now = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530')
    }, 1);



  }

  ngOnInit(): void {
    this.imageURL = this.imagePath + "Time_4_6.png";
    this.getUser()
    this.getWorkspaces()
  }

  getUser(){
    this.UserService.getUser(this.userID).subscribe({
      next:value=>
      {
        this.User = value
        if(this.User.NotificationIDs.length > 0){
          this.notificationCount = this.User.NotificationIDs.length
          this.isNotifications = false
        }

        if(this.User.FriendsRequests.length > 0){
          this.friendRequestCount = this.User.FriendsRequests.length
          this.isFriendsRequest = false
        }

      }
      ,
      error:error => {
        console.log(error)
      }
    } )
  }
  getWorkspaces(){
    this.UserService.getUserWorkspaces(this.userID).subscribe({
      next:value=>
      {
        this.workspaces = value
        this.workspaces = this.workspaces[0].WorkspaceDetails
        this.originalWorkspaces = this.workspaces
        this.loadingStatus = true

        if(this.originalWorkspaces.length === 0){
          this.errorMsg = "No workspaces available..."
          this.errorMsgStatus = false
          this.loadingStatus = true
        }
      }
      ,
      error:error => {
        console.log(error)
        this.errorMsg = "Error has been occurred!"
        this.errorMsgStatus = false
        this.loadingStatus = true
      }
    } )
  }
  dynamicWallpaper(timePrefix:String):void{
    if(Number(timePrefix) >= 0 && Number(timePrefix) < 4) {
      this.imageURL = this.imagePath + "Time_12_4.png"
      return
    }else if( Number(timePrefix) >= 4 && Number(timePrefix) < 6){
      this.imageURL = this.imagePath + "Time_4_6.png"
      return
    }else if( Number(timePrefix) >= 6 && Number(timePrefix) < 8){
      this.imageURL = this.imagePath + "Time_6_8.png"
      return
    }else if( Number(timePrefix) >= 8 && Number(timePrefix) < 10){
      this.imageURL = this.imagePath + "Time_8_10.png"
      return
    }else if( Number(timePrefix) >= 10 && Number(timePrefix) < 12){
      this.imageURL = this.imagePath + "Time_10_12.png"
      return
    }else if( Number(timePrefix) >= 12 && Number(timePrefix) < 14){
      this.imageURL = this.imagePath + "Time_12_14.png"
      return
    }else if( Number(timePrefix) >= 14 && Number(timePrefix) < 16){
      this.imageURL = this.imagePath + "Time_14_16.png"
      return
    }else if( Number(timePrefix) >= 16 && Number(timePrefix) < 18){
      this.imageURL = this.imagePath + "Time_16_18.png"
      return
    }else if( Number(timePrefix) >= 18 && Number(timePrefix) < 20){
      this.imageURL = this.imagePath + "Time_18_20.png"
      return
    }else if( Number(timePrefix) >= 20 && Number(timePrefix) < 22){
      this.imageURL = this.imagePath + "Time_20_22.png"
      return
    }else if( Number(timePrefix) >= 22 && Number(timePrefix) < 0){
      this.imageURL = this.imagePath + "Time_22_12.png"
      return
    }else{
      this.imageURL = this.imagePath + "Time_12_4.png"
      return
    }
  }
  greetingsChange(timePrefix:String):void{
    if(Number(timePrefix) >= 5 && Number(timePrefix) < 12){
        this.greetings = "good morning"
      return
    }else if(Number(timePrefix) >= 12 && Number(timePrefix) < 18){
      this.greetings = "good afternoon"
      return
    }else if(Number(timePrefix) >= 18 && Number(timePrefix) < 22){
      this.greetings = "good evening"
      return
    }else{
      this.greetings = "good night"
      return
    }
  }


  searchWorkspace() {
    this.loadingStatus = false
    this.errorMsgStatus = true
    this.workspaces = this.originalWorkspaces.filter((content: any) => {
      let loweredSearch = content.WorkspaceName.toLowerCase();
      this.loadingStatus = true
      return loweredSearch.includes(this.searchResult.toLowerCase())
    })

    if(this.workspaces.length == 0){
      this.errorMsg = "No workspace found!"
      this.errorMsgStatus = false
    }
  }

  /// modal
  CreateWorkspace() {
    this.modalService.open(this.content, { centered: true, size:"lg" }, );
  }

  hello(event: any){
    alert(event.myObj)
  }
}


