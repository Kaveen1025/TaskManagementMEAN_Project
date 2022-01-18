import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofileimagemodalComponent } from './userprofileimagemodal.component';

describe('UserprofileimagemodalComponent', () => {
  let component: UserprofileimagemodalComponent;
  let fixture: ComponentFixture<UserprofileimagemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserprofileimagemodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserprofileimagemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
