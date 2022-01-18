import { TestBed } from '@angular/core/testing';

import { WorkspaceinvService } from './workspaceinv.service';

describe('WorkspaceinvService', () => {
  let service: WorkspaceinvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkspaceinvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
