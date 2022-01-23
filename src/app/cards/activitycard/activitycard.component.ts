import {Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-activitycard',
  templateUrl: './activitycard.component.html',
  styleUrls: ['./activitycard.component.css'],

})
export class ActivitycardComponent implements OnInit {

  @ViewChild('contentWrapper') contentWrapper : any;

  @Input() cardTitle: string | undefined
  @Input() collapseID: string | undefined


  panelOpenState = false;

  allowEdit: boolean;
  private isSelected: boolean;
  editable: boolean;

  constructor() {
    this.allowEdit = false;
    this.isSelected = false;
    this.editable = true;
    this.contentWrapper = ElementRef;
  }

  ngOnInit(): void {
  }

  onClick($event:any) {
    this.isSelected = true;
  }

  onDblClick($event:any) {
    this.isSelected = true;
    if ( this.editable ) {
      this.allowEdit = true;
    }
  }

  onBlur($event:any) {
    this.isSelected = false;
    if ( this.editable ) {
      this.allowEdit = false;
    }
  }

  @HostListener('window:keydown', ['$event'])
  onWindowKeydown($event:any) {
    // if component is selected...
    if ( this.isSelected ) {
      // and is editable...
      if ( this.editable ) {
        // and edit is  allowed...
        if ( !this.allowEdit ) {

          this.allowEdit = true;

          setTimeout(() => {
            this.contentWrapper.nativeElement.innerHTML = '';
            this.contentWrapper.nativeElement.focus();
            this.contentWrapper.nativeElement.dispatchEvent($event);
          }, 5);
        }
      }
    }
  }

  styleObject(): Object {
    if ( this.isSelected ) {
      return {

        borderWidth: '1px'
      };
    }
    return {
      borderColor: 'transparent',
      borderWidth: '1px'
    };
  }

}
