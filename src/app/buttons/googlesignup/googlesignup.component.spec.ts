import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglesignupComponent } from './googlesignup.component';

describe('GooglesignupComponent', () => {
  let component: GooglesignupComponent;
  let fixture: ComponentFixture<GooglesignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GooglesignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GooglesignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
