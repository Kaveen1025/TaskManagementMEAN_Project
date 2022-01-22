import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitycardComponent } from './activitycard.component';

describe('ActivitycardComponent', () => {
  let component: ActivitycardComponent;
  let fixture: ComponentFixture<ActivitycardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitycardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
