import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupuserprofileimagemodalComponent } from './signupuserprofileimagemodal.component';

describe('SignupuserprofileimagemodalComponent', () => {
  let component: SignupuserprofileimagemodalComponent;
  let fixture: ComponentFixture<SignupuserprofileimagemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupuserprofileimagemodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupuserprofileimagemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
