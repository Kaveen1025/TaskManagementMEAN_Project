import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskstructureComponent } from './taskstructure.component';

describe('TaskstructureComponent', () => {
  let component: TaskstructureComponent;
  let fixture: ComponentFixture<TaskstructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskstructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskstructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
