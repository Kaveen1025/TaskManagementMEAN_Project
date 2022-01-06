import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsheaderComponent } from './friendsheader.component';

describe('FriendsheaderComponent', () => {
  let component: FriendsheaderComponent;
  let fixture: ComponentFixture<FriendsheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
