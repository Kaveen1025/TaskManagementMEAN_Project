import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Forgotpassword3Component } from './forgotpassword3.component';

describe('Forgotpassword3Component', () => {
  let component: Forgotpassword3Component;
  let fixture: ComponentFixture<Forgotpassword3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Forgotpassword3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Forgotpassword3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
