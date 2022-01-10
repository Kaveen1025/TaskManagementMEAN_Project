import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceaddComponent } from './workspaceadd.component';

describe('WorkspaceaddComponent', () => {
  let component: WorkspaceaddComponent;
  let fixture: ComponentFixture<WorkspaceaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
