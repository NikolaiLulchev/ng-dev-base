import { TestBed } from '@angular/core/testing';

import { ProfileGuard } from './profile-guard.service';

describe('ProfileGuardService', () => {
  let service: ProfileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
