import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ImageCroppedEvent, LoadedImage} from "ngx-image-cropper";
import {FileUpload} from "../../module/file-upload";
import {FirebasesService} from "../../services/firebases.service";
import {Observable, Observer} from "rxjs";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-userprofileimagemodal',
  templateUrl: './userprofileimagemodal.component.html',
  styleUrls: ['./userprofileimagemodal.component.css']
})
export class UserprofileimagemodalComponent implements OnInit {

  @ViewChild('content') private content: TemplateRef<any> | undefined;

  userId: string
  filePath: string;
  myForm: FormGroup;
  userImagePlaceHolder: String = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/userPlaceHolder.png"
  userProfileImage:any = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/IMG_6407.JPG"


  FirebaseService:FirebasesService
  UserService:UserService
  tempFile:any
  temp:any
  contentStatus1: boolean = false
  percentageLoading:any = true


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

  saveDetails() {
    // append file name to the user profile
    this.temp.name = "61d59e7999dc1f31177898baUserImage.png"
      this.upload(this.temp)
    this.contentStatus1 = true

    //this.FirebaseService.getUrl("/UserProfileImages/61d59e7999dc1f31177898baUserImage.png")
  }

  removeUserProfile() {
    this.userProfileImage = this.userImagePlaceHolder
    this.status = true
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
              this.contentStatus1 = false
              this.closeModal()
              alert("Image uploaded")
              this.percentageLoading = false
              let content = {
                ProfileImage : this.temp.name,
              }
              this.UserService.updateUserProfileImage(this.userId,content).subscribe({
                next: value => {
                       alert("db updated")
                }
                ,
                error: error => {
                  console.log(error)
                }
              })
            }
          },
          error => {
            console.log(error);
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


}
