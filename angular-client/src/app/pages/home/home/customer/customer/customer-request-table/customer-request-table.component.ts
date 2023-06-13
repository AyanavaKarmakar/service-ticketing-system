import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CustomerRequestsService } from 'src/app/services/customer/customer-requests/customer-requests.service';
import { IRequestForm } from 'src/app/types/CustomerRequestFormResponse';

@Component({
  selector: 'app-customer-request-table',
  templateUrl: './customer-request-table.component.html',
})
export class CustomerRequestTableComponent implements AfterViewInit, OnInit {
  isLoading = false;

  displayedColumns: string[] = [
    'productType',
    'issueType',
    'status',
    'dateOfSubmission',
    'action',
  ];

  dataSource: MatTableDataSource<IRequestForm> =
    new MatTableDataSource<IRequestForm>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private customerRequestsService: CustomerRequestsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerRequestsService.isLoading$.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );

    this.customerRequestsService.data$.subscribe(
      (data) => (this.dataSource.data = data)
    );

    this.customerRequestsService.getCustomerRequestForms();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * @param event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  /**
   * @param id id of the request form
   */
  viewFormDetails(id: string): void {
    this.router.navigate(['customer/requestFormDetails', id]);
  }
}
