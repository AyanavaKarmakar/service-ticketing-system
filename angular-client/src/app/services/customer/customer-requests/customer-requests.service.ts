import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../../user/user.service';
import { environment } from 'src/environments/environment';
import { throwError, catchError, tap, BehaviorSubject, Observable } from 'rxjs';
import {
  ICustomerRequestFormResponse,
  IRequestForm,
} from 'src/app/types/CustomerRequestFormResponse';

@Injectable({
  providedIn: 'root',
})
export class CustomerRequestsService {
  private isLoadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  get isLoading$(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }

  get isLoading(): boolean {
    return this.isLoadingSubject.getValue();
  }

  /**
   * @param isLoading true if the data is loading, false otherwise
   */
  set isLoading(isLoading: boolean) {
    this.isLoadingSubject.next(isLoading);
  }

  private dataSubject: BehaviorSubject<IRequestForm[]> = new BehaviorSubject<
    IRequestForm[]
  >([]);

  get data$(): Observable<IRequestForm[]> {
    return this.dataSubject.asObservable();
  }

  get data(): IRequestForm[] {
    return this.dataSubject.getValue();
  }

  /**
   * @param data the data to be passed to the component
   */
  set data(data: IRequestForm[]) {
    this.dataSubject.next(data);
  }

  constructor(private http: HttpClient, private userService: UserService) {}

  getCustomerRequestForms(): void {
    this.isLoading = true;

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

          this.data = data;

          this.isLoading = false;
        },

        error: (error) => {
          console.error(
            'An error occurred during fetching customer request forms:',
            error.message
          );

          this.isLoading = false;
        },
      });
  }
}
