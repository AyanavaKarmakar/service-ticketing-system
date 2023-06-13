import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CustomerFormDetailsComponent } from './customer-form-details.component';
import { UserService } from 'src/app/services/user/user.service';
import { CustomerFormDataService } from 'src/app/services/customer/customer-form-data/customer-form-data.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('CustomerFormDetailsComponent', () => {
  let component: CustomerFormDetailsComponent;
  let fixture: ComponentFixture<CustomerFormDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerFormDetailsComponent],
      imports: [HttpClientModule, MatSnackBarModule, MatProgressSpinnerModule],
      providers: [
        UserService,
        CustomerFormDataService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: 'mock-id',
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFormDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
