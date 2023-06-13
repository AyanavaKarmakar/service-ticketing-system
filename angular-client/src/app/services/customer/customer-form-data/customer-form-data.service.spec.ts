import { TestBed } from '@angular/core/testing';

import { CustomerFormDataService } from './customer-form-data.service';
import { HttpClientModule } from '@angular/common/http';

describe('CustomerFormDataService', () => {
  let service: CustomerFormDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerFormDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
