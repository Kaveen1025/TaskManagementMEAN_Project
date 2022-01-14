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
  constructor(private modalService: NgbModal,public fb: FormBuilder) {
    this.myForm = this.fb.group({
      img: [null],
      filename: ['']
    })

    this.filePath = ""
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
  }

  submit() {

  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedImagess: any;
  status: boolean = true;

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedImagess = this.croppedImage
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

  showCroppedImage() {
    this.status = false
  }
}
