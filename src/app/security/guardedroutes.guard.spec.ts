import { TestBed } from '@angular/core/testing';

import { GuardedRoutesGuard } from './guarded-routes-guard.service';

describe('GuardedroutesGuard', () => {
  let guard: GuardedRoutesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardedRoutesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
