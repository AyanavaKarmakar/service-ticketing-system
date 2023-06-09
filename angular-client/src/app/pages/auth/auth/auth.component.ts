import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  hide = true;

  isLoading = false;

  userTypes: string[] = ['customer', 'employee'];

  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);

  userTypeFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.handleNavigation();

    this.authService.isLoading$.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
  }

  /**
   * It redirects the user to the home page if the user is authenticated.
   * Otherwise, it redirects the user to the auth page.
   */
  private handleNavigation(): void {
    const isAuthenticated = this.authService.isAuthenticated();
    const userType = this.userService.getUserType();

    if (isAuthenticated && this.router.url.includes('/auth')) {
      this.router.navigate([`${userType}/home`]);
    }
  }

  isFormValid(): boolean {
    return (
      this.usernameFormControl.valid &&
      this.passwordFormControl.valid &&
      this.userTypeFormControl.valid
    );
  }

  authenticateUser(authType: string): void {
    this.authService.authenticateUser(
      this.usernameFormControl.value!,
      this.passwordFormControl.value!,
      this.userTypeFormControl.value!,
      authType
    );
  }
}
