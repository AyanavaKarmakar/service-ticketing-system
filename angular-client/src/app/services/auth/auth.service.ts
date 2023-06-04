import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { IAuthResponse } from 'src/app/types/AuthResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH_URL = 'http://localhost:3000/auth';

  constructor(
    private http: HttpClient,
    private matSnackBar: MatSnackBar,
    private cookieService: CookieService,
    private userService: UserService,
    private router: Router
  ) {}

  /**
   *
   * @returns true if the user is authenticated, false otherwise
   */
  isAuthenticated(): boolean {
    const token = this.cookieService.get('authToken');
    return !!token;
  }

  logOut(): void {
    this.cookieService.delete('authToken');
    this.userService.setUsername('');
    this.router.navigate(['/auth']);
    this.matSnackBar.open('Logged out successfully!', 'Close', {
      duration: 3000,
    });
  }

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
      .post<IAuthResponse>(`${this.AUTH_URL}/customer/login`, body, httpOptions)
      .pipe(
        tap(() => {
          this.matSnackBar.open('Logged in successfully!', 'Close', {
            duration: 3000,
          });
        }),
        catchError(() => {
          this.matSnackBar.open('Login failed. Please try again.', 'Close', {
            duration: 3000,
          });

          return throwError(() => new Error('Login failed. Please try again.'));
        })
      )
      .subscribe({
        next: (response) => {
          this.cookieService.set('authToken', response.token, { expires: 7 });
          this.userService.setUsername(username);
          this.router.navigate(['/home']);
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
