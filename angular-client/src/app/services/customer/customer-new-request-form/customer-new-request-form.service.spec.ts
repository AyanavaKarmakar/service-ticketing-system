import { TestBed } from '@angular/core/testing';

import { CustomerNewRequestFormService } from './customer-new-request-form.service';

describe('CustomerNewRequestFormService', () => {
  let service: CustomerNewRequestFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerNewRequestFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
