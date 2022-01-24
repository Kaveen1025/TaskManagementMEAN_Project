import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Multiconfirmmodal2Component } from './multiconfirmmodal2.component';

describe('Multiconfirmmodal2Component', () => {
  let component: Multiconfirmmodal2Component;
  let fixture: ComponentFixture<Multiconfirmmodal2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Multiconfirmmodal2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Multiconfirmmodal2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
