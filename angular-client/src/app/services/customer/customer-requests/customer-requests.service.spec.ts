import { TestBed } from '@angular/core/testing';
import { CustomerRequestsService } from './customer-requests.service';
import { HttpClientModule } from '@angular/common/http';

describe('CustomerRequestsService', () => {
  let service: CustomerRequestsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
