import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(
    // throws error without route : ActivatedRouteSnapshot parameter
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    const userType = this.userService.getUserType();

    if (!isAuthenticated) {
      this.router.navigate(['/auth']);
    }

    if (isAuthenticated && !state.url.startsWith(`/${userType}`)) {
      this.router.navigate([`/${userType}/home`]);
    }

    return isAuthenticated;
  }
}
