import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharetestComponent } from './sharetest.component';

describe('SharetestComponent', () => {
  let component: SharetestComponent;
  let fixture: ComponentFixture<SharetestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharetestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
