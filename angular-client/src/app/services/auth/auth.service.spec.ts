import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule],
      providers: [CookieService],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if the user is authenticated', () => {
    const isAuthenticated = true;

    spyOn(service['isAuthenticatedSubject'], 'getValue').and.returnValue(
      isAuthenticated
    );

    const result = service.isAuthenticated();

    expect(result).toBe(isAuthenticated);
  });

  it('should return false if the user is not authenticated', () => {
    const isAuthenticated = false;

    spyOn(service['isAuthenticatedSubject'], 'getValue').and.returnValue(
      isAuthenticated
    );

    const result = service.isAuthenticated();

    expect(result).toBe(isAuthenticated);
  });

  it('should logout the user', () => {
    const isAuthenticatedSubjectNextSpy = spyOn(
      service['isAuthenticatedSubject'],
      'next'
    );

    const userServiceDeleteAllCookiesSpy = spyOn(
      service['userService'],
      'deleteAllCookies'
    );

    const routerNavigateSpy = spyOn(service['router'], 'navigate');

    const matSnackBarOpenSpy = spyOn(service['matSnackBar'], 'open');

    service.logOut();

    expect(isAuthenticatedSubjectNextSpy).toHaveBeenCalledWith(false);

    expect(userServiceDeleteAllCookiesSpy).toHaveBeenCalledWith([
      'authToken',
      'username',
      'userType',
    ]);

    expect(routerNavigateSpy).toHaveBeenCalledWith(['/auth']);

    expect(matSnackBarOpenSpy).toHaveBeenCalledWith(
      'Logged out successfully!',
      'Close',
      { duration: 3000 }
    );
  });

  it('should authenticate the user', (done) => {
    // Arrange
    const username = 'testuser';
    const password = 'testpassword';
    const userType = 'customer';
    const authType = 'login';
    const authToken = 'testtoken';
    const response = { token: authToken };

    const httpPostSpy = spyOn(service['http'], 'post').and.returnValue(
      of(response)
    );

    const userServiceSetAuthTokenSpy = spyOn(
      service['userService'],
      'setAuthToken'
    );

    const userServiceSetUsernameSpy = spyOn(
      service['userService'],
      'setUsername'
    );

    const routerNavigateSpy = spyOn(service['router'], 'navigate');
    const matSnackBarOpenSpy = spyOn(service['matSnackBar'], 'open');

    // Act
    service.authenticateUser(username, password, userType, authType);

    // Assert
    expect(httpPostSpy).toHaveBeenCalledWith(
      `${environment.authUrl}/${userType}/${authType}`,
      { username, password },
      { headers: jasmine.any(HttpHeaders) }
    );

    // Simulate the asynchronous nature of the HTTP request
    setTimeout(() => {
      expect(userServiceSetAuthTokenSpy).toHaveBeenCalledWith(authToken);

      expect(userServiceSetUsernameSpy).toHaveBeenCalledWith(username);

      expect(routerNavigateSpy).toHaveBeenCalledWith([`${userType}/home`]);

      expect(matSnackBarOpenSpy).toHaveBeenCalledWith(
        'Logged in successfully!',
        'Close',
        {
          duration: 3000,
        }
      );

      expect(service['isLoading']).toBeFalse();

      done();
    }, 0);
  });
});
