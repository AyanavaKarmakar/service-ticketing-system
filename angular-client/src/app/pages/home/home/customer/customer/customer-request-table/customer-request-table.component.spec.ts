import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRequestTableComponent } from './customer-request-table.component';

describe('CustomerRequestTableComponent', () => {
  let component: CustomerRequestTableComponent;
  let fixture: ComponentFixture<CustomerRequestTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerRequestTableComponent]
    });
    fixture = TestBed.createComponent(CustomerRequestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
