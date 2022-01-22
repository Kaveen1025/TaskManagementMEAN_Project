import { TestBed } from '@angular/core/testing';

import { ProjectinvService } from './projectinv.service';

describe('ProjectinvService', () => {
  let service: ProjectinvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectinvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
