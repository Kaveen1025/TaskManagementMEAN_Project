import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ImageCroppedEvent, LoadedImage} from "ngx-image-cropper";

@Component({
  selector: 'app-userprofileimagemodal',
  templateUrl: './userprofileimagemodal.component.html',
  styleUrls: ['./userprofileimagemodal.component.css']
})
export class UserprofileimagemodalComponent implements OnInit {

  @ViewChild('content') private content: TemplateRef<any> | undefined;

  filePath: string;
  myForm: FormGroup;
  userImagePlaceHolder: String = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/userPlaceHolder.png"
  userProfileImage:any = "./assets/images/images%20Used%20in%20Project%20Management%20UI%20Design/IMG_6407.JPG"

  constructor(private modalService: NgbModal,public fb: FormBuilder) {
    this.myForm = this.fb.group({
      img: [null],
      filename: ['']
    })

    this.filePath = ""
    this.status = true
  }

  ngOnInit(): void {

  }



  closeModal() {
    this.modalService.dismissAll(this.content);
  }


  openModal() {
    this.modalService.open(this.content, { centered: true });
  }



  imagePreview(e:any) {

    this.fileChangeEvent(e)
    this.status =false
  }

  submit() {

  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  status: boolean;


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.userProfileImage = this.croppedImage
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

  }

  removeUserProfile() {
    this.userProfileImage = this.userImagePlaceHolder
    this.status = true
  }
}
