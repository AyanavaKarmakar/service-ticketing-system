import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private username = new BehaviorSubject<string>('');

  /**
   *
   * @param username
   */
  setUsername(username: string): void {
    this.username.next(username);
  }

  getUsername(): BehaviorSubject<string> {
    return this.username;
  }

  constructor() {}
}
