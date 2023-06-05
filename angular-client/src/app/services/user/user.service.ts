import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private cookieService: CookieService) {}

  /**
   *
   * @param username
   */
  setUsername(username: string): void {
    this.cookieService.set('username', username);
  }

  getUsername(): string {
    return this.cookieService.get('username');
  }

  setUserType(userType: string): void {
    this.cookieService.set('userType', userType);
  }

  getUserType(): string {
    return this.cookieService.get('userType');
  }
}
