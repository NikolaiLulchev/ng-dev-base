import {TestBed} from '@angular/core/testing';

import {OfferGuard} from './offer-guard.service';

describe('OfferGuardService', () => {
  let service: OfferGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
