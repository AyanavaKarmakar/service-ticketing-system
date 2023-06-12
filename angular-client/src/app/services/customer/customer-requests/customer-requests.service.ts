import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../../user/user.service';
import { environment } from 'src/environments/environment';
import { throwError, catchError, tap } from 'rxjs';

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
      .get<any>(environment.customerRequestUrl, httpOptions)
      .pipe(
        tap((response) => {
          console.log(response);
        }),
        catchError((error) => {
          console.log(error);
          return throwError(() => new Error(error));
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
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
