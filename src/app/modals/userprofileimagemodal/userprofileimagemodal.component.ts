import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ImageCroppedEvent, LoadedImage} from "ngx-image-cropper";
import {FileUpload} from "../../module/file-upload";
import {FirebasesService} from "../../services/firebases.service";
import {Observable, Observer} from "rxjs";
import {UserService} from "../../services/user.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-userprofileimagemodal',
  templateUrl: './userprofileimagemodal.component.html',
  styleUrls: ['./userprofileimagemodal.component.css']
})
export class UserprofileimagemodalComponent implements OnInit {

  @ViewChild('content') private content: TemplateRef<any> | undefined;
  @ViewChild('content100') private content100: TemplateRef<any> | undefined;

  userId: string
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
    this.userId = "61d59e7999dc1f31177898ba"
    this.userProfileImage = this.userImagePlaceHolder

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



  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    //console.log(typeof event)
    this.userProfileImage = this.croppedImage
    this.temp = this.dataURItoBlobDD(event.base64)
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


 generateCode(length:any) {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  async saveDetails() {
    // append file name to the user profile

    if(this.userProfileImage == this.userImagePlaceHolder){
      this.updateUserProfileInBackend()
      this.contentStatus1 = true
    }else{
     this.temp.name = "UserProfileImages/"+this.userId+this.generateCode(8)+"UserImage.png"
     //  this.temp.name = "UserProfileImages/kfasfklsadfsdsklfUserImage.png"
      //console.log(this.temp.name)
      this.upload(this.temp)
      this.contentStatus1 = true
    }

    // e.target.file[0].name


  }

  removeUserProfile() {
    this.userProfileImage = this.userImagePlaceHolder
    this.status = true
    this.updateUserProfileInBackend()
  }


// upload image
  upload(selectedFile:any): void {
    let percentage
        let currentFileUpload = new FileUpload(selectedFile);
        this.FirebaseService.pushFileToStorage(currentFileUpload).subscribe(
          percentage => {
            percentage = Math.round(percentage ? percentage : 0);
            console.log('done')
            if(percentage >= 100 && this.percentageLoading){
              this.percentageLoading = false
              let content = {
                ProfileImage: this.temp.name,
              }

              this.UserService.updateUserProfileImage(this.userId,content).subscribe({
                next: value => {
                  // alert("db updated")

                  this.contentStatus1 = false
                  this.closeModal()
                  this.someEvent.emit()
                }
                ,
                error: error => {
                  console.log(error)
                  this.contentStatus1 = false
                  this.closeModal()
                }
              })
            }
          },
          error => {
            console.log(error);
            this.contentStatus1 = false
            this.closeModal()
          }
        );
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

  updateUserProfileInBackend(){
    let content2 = {
      ProfileImage : this.userImagePlaceHolder,
    }
    this.UserService.updateUserProfileImage(this.userId,content2).subscribe({
      next: value => {
        // alert("db updated")

        this.contentStatus1 = false
        this.closeModal()
        this.someEvent.emit()

      }
      ,
      error: error => {
        console.log(error)
        this.contentStatus1 = false
        this.closeModal()
      }
    })
  }

}
