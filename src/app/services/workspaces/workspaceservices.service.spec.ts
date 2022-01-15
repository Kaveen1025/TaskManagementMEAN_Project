import { TestBed } from '@angular/core/testing';

import { WorkspaceservicesService } from './workspaceservices.service';

describe('WorkspaceservicesService', () => {
  let service: WorkspaceservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkspaceservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
