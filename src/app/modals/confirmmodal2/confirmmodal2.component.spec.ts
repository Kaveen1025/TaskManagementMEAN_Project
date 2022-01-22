import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Confirmmodal2Component } from './confirmmodal2.component';

describe('Confirmmodal2Component', () => {
  let component: Confirmmodal2Component;
  let fixture: ComponentFixture<Confirmmodal2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Confirmmodal2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Confirmmodal2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
