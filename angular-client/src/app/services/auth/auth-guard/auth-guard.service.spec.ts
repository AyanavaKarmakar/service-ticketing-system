import { TestBed } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AuthService, MatSnackBar],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to /auth if user is not authenticated', () => {
    const routerSpy = spyOn(service['router'], 'navigate');

    const isAuthenticatedSpy = spyOn(
      service['authService'],
      'isAuthenticated'
    ).and.returnValue(false);

    const route = new ActivatedRouteSnapshot();
    const state = { url: '/mock-url' } as RouterStateSnapshot;
    const result = service.canActivate(route, state);

    expect(isAuthenticatedSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/auth']);
    expect(result).toBe(false);
  });

  it('should allow access if user is authenticated and URL starts with correct user type', () => {
    const routerSpy = spyOn(service['router'], 'navigate');

    const isAuthenticatedSpy = spyOn(
      service['authService'],
      'isAuthenticated'
    ).and.returnValue(true);

    const getUserTypeSpy = spyOn(
      service['userService'],
      'getUserType'
    ).and.returnValue('admin');

    const route = new ActivatedRouteSnapshot();
    const state = { url: '/admin/mock-url' } as RouterStateSnapshot;
    const result = service.canActivate(route, state);

    expect(isAuthenticatedSpy).toHaveBeenCalled();
    expect(getUserTypeSpy).toHaveBeenCalled();
    expect(routerSpy).not.toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should navigate to /{userType}/home if user is authenticated but URL does not start with correct user type', () => {
    const routerSpy = spyOn(service['router'], 'navigate');

    const isAuthenticatedSpy = spyOn(
      service['authService'],
      'isAuthenticated'
    ).and.returnValue(true);

    const getUserTypeSpy = spyOn(
      service['userService'],
      'getUserType'
    ).and.returnValue('admin');

    const route = new ActivatedRouteSnapshot();
    const state = { url: '/customer/home' } as RouterStateSnapshot;
    const result = service.canActivate(route, state);

    expect(isAuthenticatedSpy).toHaveBeenCalled();
    expect(getUserTypeSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/admin/home']);
    // we return true but because the router has already navigated before returning
    expect(result).toBe(true);
  });
});
