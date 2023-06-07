import { TestBed } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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

  it('should allow access if user is authenticated', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'isAuthenticated').and.returnValue(true);

    const canActivate = service.canActivate();
    expect(canActivate).toBeTrue();
  });

  it('should navigate to auth page if user is not authenticated', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'isAuthenticated').and.returnValue(false);

    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    service.canActivate();

    expect(router.navigate).toHaveBeenCalledWith(['/auth']);
  });
});
