import { TestBed } from '@angular/core/testing';

import { IsAuthGuard } from './is-auth-guard.service';

describe('AuthGuard', () => {
  let guard: IsAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
