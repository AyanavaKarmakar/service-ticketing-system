import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../../user/user.service';
import { environment } from 'src/environments/environment';
import { throwError, catchError, tap, BehaviorSubject, Observable } from 'rxjs';
import { ICustomerRequestFormDataResponse } from 'src/app/types/CustomerRequestFormResponse';

@Injectable({
  providedIn: 'root',
})
export class CustomerFormDataService {
  constructor(private http: HttpClient, private userService: UserService) {}

  getCustomerRequestFormData(formId: string): void {
    const authToken = this.userService.getAuthToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      }),
    };

    this.http
      .get<ICustomerRequestFormDataResponse>(
        `${environment.customerRequestUrl}/${formId}`,
        httpOptions
      )
      .pipe(
        tap((_) => {}),
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error(error));
        })
      )
      .subscribe({
        next: ({ requestForm }) => {
          // filter only the required data
          const data = {
            productType: requestForm.productType,
            issueType: requestForm.issueType,
            issueDescription: requestForm.issueDescription,
            policyUpload: requestForm.policyUpload,
            dateOfSubmission: requestForm.dateOfSubmission,
            status: requestForm.status,
          };

          // TODO - remove console.log
          console.log(data);
        },

        error: (error) => {
          console.error(
            'An error occurred during fetching customer request form data:',
            error.message
          );
        },
      });
  }
}
