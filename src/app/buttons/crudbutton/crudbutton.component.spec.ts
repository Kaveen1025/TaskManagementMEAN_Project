import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudbuttonComponent } from './crudbutton.component';

describe('CrudbuttonComponent', () => {
  let component: CrudbuttonComponent;
  let fixture: ComponentFixture<CrudbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudbuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
