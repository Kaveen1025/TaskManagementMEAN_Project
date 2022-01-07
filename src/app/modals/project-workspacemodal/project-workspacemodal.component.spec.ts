import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWorkspacemodalComponent } from './project-workspacemodal.component';

describe('ProjectWorkspacemodalComponent', () => {
  let component: ProjectWorkspacemodalComponent;
  let fixture: ComponentFixture<ProjectWorkspacemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectWorkspacemodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkspacemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
