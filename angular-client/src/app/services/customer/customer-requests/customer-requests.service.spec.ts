import { TestBed } from '@angular/core/testing';
import { CustomerRequestsService } from './customer-requests.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('CustomerRequestsService', () => {
  let service: CustomerRequestsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule],
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
