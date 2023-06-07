import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let cookieService: CookieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule],
      providers: [CookieService],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    cookieService = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if the user is authenticated', () => {
    spyOn(cookieService, 'get').and.returnValue('authToken');

    const isAuthenticated = service.isAuthenticated();

    expect(isAuthenticated).toBeTrue();
  });

  it('should return false if the user is not authenticated', () => {
    spyOn(cookieService, 'get').and.returnValue('');

    const isAuthenticated = service.isAuthenticated();

    expect(isAuthenticated).toBeFalse();
  });

  it('should logout the user', () => {
    const cookieDeleteSpy = spyOn(cookieService, 'delete').and.callThrough();
    const routeNavigateSpy = spyOn(service['router'], 'navigate').and.stub();
    const snackBarOpenSpy = spyOn(service['matSnackBar'], 'open').and.stub();

    service.logOut();

    expect(cookieDeleteSpy).toHaveBeenCalledTimes(3);
    expect(cookieDeleteSpy).toHaveBeenCalledWith('authToken');
    expect(cookieDeleteSpy).toHaveBeenCalledWith('username');
    expect(cookieDeleteSpy).toHaveBeenCalledWith('userType');

    expect(routeNavigateSpy).toHaveBeenCalledTimes(1);
    expect(routeNavigateSpy).toHaveBeenCalledWith(['/auth']);

    expect(snackBarOpenSpy).toHaveBeenCalledTimes(1);
    expect(snackBarOpenSpy).toHaveBeenCalledWith(
      'Logged out successfully!',
      'Close',
      { duration: 3000 }
    );
  });

  it('should authenticate the user', () => {
    const expectedToken = 'authToken';

    const fakeResponse = {
      token: expectedToken,
    };

    const httpClientPostSpy = spyOn(service['http'], 'post').and.returnValue(
      of(fakeResponse)
    );

    const cookieSetSpy = spyOn(cookieService, 'set').and.stub();

    const userServiceSetUsernameSpy = spyOn(
      service['userService'],
      'setUsername'
    ).and.stub();

    const userServiceSetUserTypeSpy = spyOn(
      service['userService'],
      'setUserType'
    ).and.stub();

    const routerNavigateSpy = spyOn(service['router'], 'navigate').and.stub();
    const snackBarOpenSpy = spyOn(service['matSnackBar'], 'open').and.stub();

    service.authenticateUser('testUser', 'testPassword', 'customer', 'login');

    expect(httpClientPostSpy).toHaveBeenCalledTimes(1);

    expect(cookieSetSpy).toHaveBeenCalledTimes(1);
    expect(cookieSetSpy).toHaveBeenCalledWith('authToken', expectedToken, {
      expires: 7,
    });

    expect(userServiceSetUsernameSpy).toHaveBeenCalledWith('testUser');
    expect(userServiceSetUserTypeSpy).toHaveBeenCalledWith('customer');

    expect(routerNavigateSpy).toHaveBeenCalledWith(['customer/home']);

    expect(snackBarOpenSpy).toHaveBeenCalledWith(
      'Logged in successfully!',
      'Close',
      { duration: 3000 }
    );
  });
});
