import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FirebasesService} from "../../services/firebases.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ImageCroppedEvent, LoadedImage} from "ngx-image-cropper";
import {FileUpload} from "../../module/file-upload";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-signupuserprofileimagemodal',
  templateUrl: './signupuserprofileimagemodal.component.html',
  styleUrls: ['./signupuserprofileimagemodal.component.css']
})
export class SignupuserprofileimagemodalComponent implements OnInit {


  @ViewChild('content') private content: TemplateRef<any> | undefined;
  @ViewChild('content100') private content100: TemplateRef<any> | undefined;

  filePath: string;
  myForm: FormGroup;
  userImagePlaceHolder: String = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/userPlaceHolder.png"
  @Input() userProfileImage:any


  FirebaseService:FirebasesService
  UserService:UserService
  tempFile:any
  temp:any
  contentStatus1: boolean = false
  percentageLoading:any = true
  @Output() someEvent = new EventEmitter()
  @Output() someEvent2 = new EventEmitter()
  @Output() successEvent = new EventEmitter()
  constructor(private modalService: NgbModal,public fb: FormBuilder,FirebaseService: FirebasesService,UserService:UserService) {
    this.myForm = this.fb.group({
      img: [null],
      filename: ['']
    })
    this.filePath = ""
    this.status = true
    this.FirebaseService = FirebaseService
    this.UserService = UserService

    this.userProfileImage = this.userImagePlaceHolder
    this.temp = null
  }

  ngOnInit(): void {
  }
  closeModal() {
    this.modalService.dismissAll(this.content);
  }

  openModal() {
    this.modalService.open(this.content, { centered: true});
  }


  imagePreview(e:any) {
    this.fileChangeEvent(e)
    this.status =false
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  status: boolean;

  generateFileName(length:any) {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    //console.log(typeof event)
    this.userProfileImage = this.croppedImage
    this.temp = this.dataURItoBlobDD(event.base64)
    this.temp.name = "UserProfileImages/"+this.generateFileName(10)+"UserImage.png"
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  async saveDetails() {
    if(this.temp != null){
      let content = {
        profileImage : this.temp
      }
      this.someEvent.emit(content)
      this.closeModal()
    }else{
      this.someEvent.emit(null)
      this.closeModal()
    }



  }
  removeUserProfile() {
    this.userProfileImage = this.userImagePlaceHolder
    this.status = true
    this.temp = null
  }
  // covert base64 uri for image
  dataURItoBlobDD(dataURI:any) {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }

    return new Blob([new Uint8Array(array)], {
      type: 'image/png',
    });
  }
}
