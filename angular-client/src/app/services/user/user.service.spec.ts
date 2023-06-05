import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { CookieService } from 'ngx-cookie-service';

describe('UserService', () => {
  let service: UserService;
  let cookieService: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CookieService],
    });
    service = TestBed.inject(UserService);
    cookieService = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get the username correctly', () => {
    const username = 'JohnDoe';
    service.setUsername(username);
    expect(cookieService.get('username')).toEqual(username);
    expect(service.getUsername()).toEqual(username);
  });

  it('should set and get the user type correctly', () => {
    const userType = 'admin';
    service.setUserType(userType);
    expect(cookieService.get('userType')).toEqual(userType);
    expect(service.getUserType()).toEqual(userType);
  });

  it('should return an empty string if the username is not set', () => {
    cookieService.delete('username');
    expect(service.getUsername()).toEqual('');
  });

  it('should return an empty string if the user type is not set', () => {
    cookieService.delete('userType');
    expect(service.getUserType()).toEqual('');
  });
});
