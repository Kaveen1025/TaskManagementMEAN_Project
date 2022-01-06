import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptordeclinebtnComponent } from './acceptordeclinebtn.component';

describe('AcceptordeclinebtnComponent', () => {
  let component: AcceptordeclinebtnComponent;
  let fixture: ComponentFixture<AcceptordeclinebtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptordeclinebtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptordeclinebtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
