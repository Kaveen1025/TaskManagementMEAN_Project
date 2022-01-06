import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendfriendrequestcardComponent } from './sendfriendrequestcard.component';

describe('SendfriendrequestcardComponent', () => {
  let component: SendfriendrequestcardComponent;
  let fixture: ComponentFixture<SendfriendrequestcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendfriendrequestcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendfriendrequestcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
