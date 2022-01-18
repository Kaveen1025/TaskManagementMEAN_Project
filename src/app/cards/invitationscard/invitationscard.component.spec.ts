import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationscardComponent } from './invitationscard.component';

describe('InvitationscardComponent', () => {
  let component: InvitationscardComponent;
  let fixture: ComponentFixture<InvitationscardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitationscardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationscardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
