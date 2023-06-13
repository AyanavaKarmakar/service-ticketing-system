import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../../user/user.service';
import { environment } from 'src/environments/environment';
import { throwError, catchError, tap, BehaviorSubject, Observable } from 'rxjs';
import {
  ICustomerRequestFormDataResponse,
  IRequestFormData,
} from 'src/app/types/CustomerRequestFormResponse';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CustomerFormDataService {
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

  private dataSubject: BehaviorSubject<IRequestFormData> =
    new BehaviorSubject<IRequestFormData>({} as IRequestFormData);

  get data$(): Observable<IRequestFormData> {
    return this.dataSubject.asObservable();
  }

  get data(): IRequestFormData {
    return this.dataSubject.getValue();
  }

  /**
   * @param data the data to be passed to the component
   */
  set data(data: IRequestFormData) {
    this.dataSubject.next(data);
  }

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private matSnackbar: MatSnackBar
  ) {}

  getCustomerRequestFormData(formId: string): void {
    this.isLoading = true;

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

          this.data = data;

          this.isLoading = false;
        },

        error: (error) => {
          console.error(
            'An error occurred during fetching customer request form data:',
            error.message
          );

          this.isLoading = false;

          this.matSnackbar.open(
            'An error occurred during fetching customer request form data',
            'Close',
            {
              duration: 3000,
            }
          );
        },
      });
  }
}
