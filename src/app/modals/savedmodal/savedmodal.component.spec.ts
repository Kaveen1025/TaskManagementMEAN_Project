import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedmodalComponent } from './savedmodal.component';

describe('SavedmodalComponent', () => {
  let component: SavedmodalComponent;
  let fixture: ComponentFixture<SavedmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
