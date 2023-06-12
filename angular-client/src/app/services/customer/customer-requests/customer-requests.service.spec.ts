import { TestBed } from '@angular/core/testing';

import { CustomerRequestsService } from './customer-requests.service';

describe('CustomerRequestsService', () => {
  let service: CustomerRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
