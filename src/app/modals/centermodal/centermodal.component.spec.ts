import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentermodalComponent } from './centermodal.component';

describe('CentermodalComponent', () => {
  let component: CentermodalComponent;
  let fixture: ComponentFixture<CentermodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentermodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
