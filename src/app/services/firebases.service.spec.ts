import { TestBed } from '@angular/core/testing';

import { FirebasesService } from './firebases.service';

describe('FirebasesService', () => {
  let service: FirebasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
