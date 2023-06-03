import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

const AUTH_URL = 'http://localhost:3000/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /**
   *
   * @param username username of the customer
   * @param password password of the customer
   */
  loginCustomer(username: string, password: string): void {
    const body: { [key: string]: string } = {
      username,
      password,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    this.http
      .post(`${AUTH_URL}/customer/login`, body, httpOptions)
      .pipe(
        tap(() => {
          console.log('Logged in successfully!');
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('An error occurred during login:', error.message);

          return throwError(() => new Error('Login failed. Please try again.'));
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
        },

        error: (error) => {
          console.error('An error occurred during login:', error.message);
        },
      });
  }
}

/**
  
  # Reference [TODO: REMOVE]
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url).pipe(
      map((heroes) => heroes[0]), // returns a {0|1} element array
      tap((h) => {
        const outcome = h ? 'fetched' : 'did not find';
        this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

 */
