import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginerrComponent } from './loginerr.component';

describe('LoginerrComponent', () => {
  let component: LoginerrComponent;
  let fixture: ComponentFixture<LoginerrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginerrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginerrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
