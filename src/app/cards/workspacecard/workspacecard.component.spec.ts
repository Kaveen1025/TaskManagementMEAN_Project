import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspacecardComponent } from './workspacecard.component';

describe('WorkspacecardComponent', () => {
  let component: WorkspacecardComponent;
  let fixture: ComponentFixture<WorkspacecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspacecardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspacecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
