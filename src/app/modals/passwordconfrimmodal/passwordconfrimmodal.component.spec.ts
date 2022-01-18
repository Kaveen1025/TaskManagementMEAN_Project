import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordconfrimmodalComponent } from './passwordconfrimmodal.component';

describe('PasswordconfrimmodalComponent', () => {
  let component: PasswordconfrimmodalComponent;
  let fixture: ComponentFixture<PasswordconfrimmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordconfrimmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordconfrimmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
