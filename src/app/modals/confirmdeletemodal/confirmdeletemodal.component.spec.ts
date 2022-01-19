import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmdeletemodalComponent } from './confirmdeletemodal.component';

describe('ConfirmdeletemodalComponent', () => {
  let component: ConfirmdeletemodalComponent;
  let fixture: ComponentFixture<ConfirmdeletemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmdeletemodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmdeletemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
