import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatargroupComponent } from './avatargroup.component';

describe('AvatargroupComponent', () => {
  let component: AvatargroupComponent;
  let fixture: ComponentFixture<AvatargroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatargroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatargroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
