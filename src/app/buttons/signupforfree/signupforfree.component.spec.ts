import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupforfreeComponent } from './signupforfree.component';

describe('SignupforfreeComponent', () => {
  let component: SignupforfreeComponent;
  let fixture: ComponentFixture<SignupforfreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupforfreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupforfreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
