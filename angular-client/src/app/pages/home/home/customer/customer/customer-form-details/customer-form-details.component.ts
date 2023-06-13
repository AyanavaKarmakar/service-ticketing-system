import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerFormDataService } from 'src/app/services/customer/customer-form-data/customer-form-data.service';
import { UserService } from 'src/app/services/user/user.service';
import { IRequestFormData } from 'src/app/types/CustomerRequestFormResponse';

@Component({
  selector: 'app-customer-form-details',
  templateUrl: './customer-form-details.component.html',
})
export class CustomerFormDetailsComponent implements OnInit {
  formId!: string;

  isLoading = false;

  formData!: IRequestFormData;

  username!: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private customerFormDataService: CustomerFormDataService
  ) {}

  ngOnInit(): void {
    this.username = this.userService.getUsername();

    this.formId = this.route.snapshot.params['id'];

    this.customerFormDataService.isLoading$.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );

    this.customerFormDataService.data$.subscribe(
      (data) => (this.formData = data)
    );

    this.customerFormDataService.getCustomerRequestFormData(this.formId);
  }
}
