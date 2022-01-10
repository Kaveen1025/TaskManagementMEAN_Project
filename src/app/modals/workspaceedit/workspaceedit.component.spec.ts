import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceeditComponent } from './workspaceedit.component';

describe('WorkspaceeditComponent', () => {
  let component: WorkspaceeditComponent;
  let fixture: ComponentFixture<WorkspaceeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
