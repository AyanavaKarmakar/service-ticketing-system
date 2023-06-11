import { RouterModule } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRequestTableComponent } from './customer-request-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CustomerRequestTableComponent', () => {
  let component: CustomerRequestTableComponent;
  let fixture: ComponentFixture<CustomerRequestTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerRequestTableComponent],
      imports: [
        BrowserAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatTableModule,
        RouterModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRequestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
