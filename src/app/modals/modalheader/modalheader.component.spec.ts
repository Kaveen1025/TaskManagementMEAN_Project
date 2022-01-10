import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalheaderComponent } from './modalheader.component';

describe('ModalheaderComponent', () => {
  let component: ModalheaderComponent;
  let fixture: ComponentFixture<ModalheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
