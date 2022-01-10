import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudbuttonpinkComponent } from './crudbuttonpink.component';

describe('CrudbuttonpinkComponent', () => {
  let component: CrudbuttonpinkComponent;
  let fixture: ComponentFixture<CrudbuttonpinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudbuttonpinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudbuttonpinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
