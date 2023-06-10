import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private cookieService: CookieService) {}

  /**
   * @param name name of the cookie to be deleted
   */
  private deleteCookie(name: string): void {
    const path = '/';
    const domain = window.location.hostname;
    const secure = true;
    const sameSite = 'Lax';
    console.log(window.location.hostname);
    this.cookieService.delete(name, path, domain, secure, sameSite);
  }

  /**
   * @param cookieNames names of the cookies to be deleted
   */
  deleteAllCookies(cookieNames: string[]): void {
    cookieNames.forEach((cookieName) => this.deleteCookie(cookieName));
  }

  getAuthToken(): string {
    return this.cookieService.get('authToken');
  }

  /**
   * @param authToken token of the user
   */
  setAuthToken(authToken: string): void {
    this.cookieService.set('authToken', authToken, {
      expires: 7,
      secure: true,
      sameSite: 'Lax',
      domain: window.location.hostname,
      path: '/',
    });
  }

  /**
   * @param username username of the user
   */
  setUsername(username: string): void {
    this.cookieService.set('username', username, {
      expires: 7,
      secure: true,
      sameSite: 'Lax',
      domain: window.location.hostname,
      path: '/',
    });
  }

  getUsername(): string {
    return this.cookieService.get('username');
  }

  /**
   * @param userType type of the user
   */
  setUserType(userType: string): void {
    this.cookieService.set('userType', userType, {
      expires: 7,
      secure: true,
      sameSite: 'Lax',
      domain: window.location.hostname,
      path: '/',
    });
  }

  getUserType(): string {
    return this.cookieService.get('userType');
  }
}
