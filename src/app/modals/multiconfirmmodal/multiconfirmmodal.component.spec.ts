import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MulticonfirmmodalComponent } from './multiconfirmmodal.component';

describe('MulticonfirmmodalComponent', () => {
  let component: MulticonfirmmodalComponent;
  let fixture: ComponentFixture<MulticonfirmmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MulticonfirmmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MulticonfirmmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
