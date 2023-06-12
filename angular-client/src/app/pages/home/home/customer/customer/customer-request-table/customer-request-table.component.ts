import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerRequestsService } from 'src/app/services/customer/customer-requests/customer-requests.service';

export interface IUserRequestsData {
  id: string;
  productType: string;
  issueType: string[];
  status: 'Open' | 'On Hold' | 'Completed';
  dateOfSubmission: string;
}

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

  dataSource?: MatTableDataSource<IUserRequestsData>;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(public customerRequestsService: CustomerRequestsService) {}

  ngOnInit(): void {
    this.customerRequestsService.isLoading$.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );

    const userRequestsData: IUserRequestsData[] = [
      {
        id: '1',
        productType: 'Laptop',
        issueType: ['Screen', 'Keyboard'],
        status: 'Open',
        dateOfSubmission: '2021-01-01',
      },
      {
        id: '2',
        productType: 'Desktop',
        issueType: ['Screen', 'Keyboard'],
        status: 'On Hold',
        dateOfSubmission: '2021-01-01',
      },
      {
        id: '3',
        productType: 'Mobile',
        issueType: ['Screen', 'Battery'],
        status: 'Completed',
        dateOfSubmission: '2021-01-01',
      },
    ];

    this.dataSource = new MatTableDataSource(userRequestsData);
  }

  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
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
}
