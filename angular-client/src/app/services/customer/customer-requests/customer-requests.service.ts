import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../../user/user.service';
import { environment } from 'src/environments/environment';
import { throwError, catchError, tap } from 'rxjs';
import { ICustomerRequestFormResponse } from 'src/app/types/CustomerRequestFormResponse';

@Injectable({
  providedIn: 'root',
})
export class CustomerRequestsService {
  constructor(private http: HttpClient, private userService: UserService) {}

  getCustomerRequestForms(): void {
    const authToken = this.userService.getAuthToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      }),
    };

    this.http
      .get<ICustomerRequestFormResponse>(
        environment.customerRequestUrl,
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
        next: (response) => {
          const data = response.requestForms.map((requestForm) => {
            return {
              productType: requestForm.productType,
              issueType: requestForm.issueType,
              status: requestForm.status,
              dateOfSubmission: requestForm.dateOfSubmission,
            };
          });

          console.log(data);

          // TODO: create obserable to pass data to component
        },

        error: (error) => {
          console.error(
            'An error occurred during fetching customer request forms:',
            error.message
          );
        },
      });
  }
}
