import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationheaderComponent } from './notificationheader.component';

describe('NotificationheaderComponent', () => {
  let component: NotificationheaderComponent;
  let fixture: ComponentFixture<NotificationheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
