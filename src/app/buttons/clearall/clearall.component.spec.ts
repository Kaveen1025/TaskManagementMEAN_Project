import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearallComponent } from './clearall.component';

describe('ClearallComponent', () => {
  let component: ClearallComponent;
  let fixture: ComponentFixture<ClearallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
