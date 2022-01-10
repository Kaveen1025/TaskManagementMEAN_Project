import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralnoificationsComponent } from './generalnoifications.component';

describe('GeneralnoificationsComponent', () => {
  let component: GeneralnoificationsComponent;
  let fixture: ComponentFixture<GeneralnoificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralnoificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralnoificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
