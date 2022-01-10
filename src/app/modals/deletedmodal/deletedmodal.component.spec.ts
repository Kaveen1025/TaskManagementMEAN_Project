import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedmodalComponent } from './deletedmodal.component';

describe('DeletedmodalComponent', () => {
  let component: DeletedmodalComponent;
  let fixture: ComponentFixture<DeletedmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
