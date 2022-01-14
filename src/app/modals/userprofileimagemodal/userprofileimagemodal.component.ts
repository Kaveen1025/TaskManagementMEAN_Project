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
    // // @ts-ignore
    // const file = (e.target as HTMLInputElement).files[0];
    //
    // this.myForm.patchValue({
    //   img: file
    // });
    //
    // // @ts-ignore
    // this.myForm.get('img').updateValueAndValidity()
    //
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.filePath = reader.result as string;
    // }
    // reader.readAsDataURL(file)

    this.fileChangeEvent(e)
  }

  submit() {

  }



  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
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
}
