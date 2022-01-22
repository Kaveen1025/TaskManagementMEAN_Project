import {Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {FriendspageService} from "../../services/friendspage.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-friendspage',
  templateUrl: './friendspage.component.html',
  styleUrls: ['./friendspage.component.css']
})
export class FriendspageComponent implements OnInit {

  @ViewChild('successModal', {static: true}) successModal: TemplateRef<any> | undefined

  friendsCssDefault = "friends"
  friendsRequestCssDefault = "freindrequestdefault"
  freindsCss = "friends"
  friendRequestCss = "freindrequestdefault"

  noOfFriends: number = 0
  requestArray:any[]
  userID: string = "61d458c91d0655dd1358454a"
  friendRequest: any[] = [{}];
  friendRequestObject: any = {};
  friendRequestObjectConstant: any[] = [{}];


  friends:any[] = [{}];
  friendsObject: any = {};
  friendsObjectConstant: any[] = [{}];

  errorvalue = false;
  errorValuefriends = false
  flagContent = false
  flagFriends = false

  requestDisplay = false
  friendDisplay = false


  friendspageService : FriendspageService;
  constructor(friendspageService : FriendspageService, private modalService: NgbModal,) {
    this.requestArray = ["1","2","3","4","5","6","7","8","9","10"]
    this.friendspageService = friendspageService;
  }

  ngOnInit(): void {
    this.getAllUserRequests()
    this.getAllUserFriends()
    this.displayFriends()
  }



  getAllUserRequests(){
    this.friendspageService.getAllFriendRequests(this.userID).subscribe((post: any)=> {
      this.friendRequestObject = post;
      this.friendRequestObjectConstant = post;
      // console.log(this.friendRequestObject)
      if(this.friendRequestObject[0].FriendRequestDetails.length < 1){
        this.errorvalue = true;
        this.flagContent = false

      }else {
        // this.errorvalue = true;
        this.errorvalue = false;
        this.flagContent = true
        this.friendRequest = this.friendRequestObject[0].FriendRequestDetails
      }

    }, error => {
      console.log(error);
    });

  }

  getAllUserFriends(){
    this.friendspageService.getAllFriends(this.userID).subscribe((post: any)=> {
      console.log(post)
      this.friendsObject = post;
      this.friendsObjectConstant = post;
      this.noOfFriends = this.friendsObject[0].AllFriends.length;
      // console.log(this.friendsObject[0].AllFriends)
      if(this.friendsObject[0].AllFriends.length < 1){
        this.errorValuefriends = true;
        this.flagFriends = false

      }else {
        // this.errorvalue = true;
        this.errorValuefriends = false;
        this.flagFriends = true
        this.friends = this.friendsObject[0].AllFriends
      }



    }, error => {
      console.log(error);
    });

  }

  displayFriends(){
    this.friendDisplay = true
    this.requestDisplay = false

    this.freindsCss = "friends"
    this.friendRequestCss = "freindrequestdefault"
  }
  displayRequests(){
    this.requestDisplay = true
    this.friendDisplay = false
    this.freindsCss = "freinddefault"
    this.friendRequestCss = "freindrequest"

  }
  searchRequests(searchtext: string){
    // alert(searchtext);
    // console.log("aaa")

    console.log(this.friendRequestObjectConstant[0].FriendRequestDetails)


    let searchResult = this.friendRequestObjectConstant[0].FriendRequestDetails.filter(
      (post: { FirstName: any; }) =>
        post.FirstName.toLowerCase().includes(searchtext.toLowerCase())
    );

    if(searchResult.length >0){
      // console.log("Return array")
      // console.log(searchResult)
      this.friendRequest = searchResult;
      this.errorvalue = false;
      this.flagContent = true
    }else{
      this.friendRequest = [];
      this.errorvalue = true;
      this.flagContent = false
    }

    let searchResult2 = this.friendsObjectConstant[0].AllFriends.filter(
      (post: { FirstName: any; }) =>
        post.FirstName.toLowerCase().includes(searchtext.toLowerCase())
    );

    if(searchResult2.length >0){
      // console.log("Return array")
      // console.log(searchResult)
      this.friends = searchResult2;
      this.errorValuefriends = false;
      this.flagFriends = true
    }else{
      this.friends = [];
      this.errorValuefriends = true;
      this.flagFriends = false
    }

  }

  displaySuccess(){
    this.modalService.open(this.successModal, { centered: true, backdrop: "static"});
    this.getAllUserRequests()
  }

  displaySuccess2(){
    this.modalService.open(this.successModal, { centered: true,  backdrop: "static"});
    this.getAllUserFriends()
  }


}
