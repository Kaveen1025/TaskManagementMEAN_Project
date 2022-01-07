import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspacepageComponent } from './workspacepage.component';

describe('WorkspacepageComponent', () => {
  let component: WorkspacepageComponent;
  let fixture: ComponentFixture<WorkspacepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspacepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspacepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
