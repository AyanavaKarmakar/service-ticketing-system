import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  hide = true;

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

  constructor(private authService: AuthService) {}

  isFormValid(): boolean {
    return (
      this.usernameFormControl.valid &&
      this.passwordFormControl.valid &&
      this.userTypeFormControl.valid
    );
  }

  loginUser(): void {
    this.authService.loginCustomer(
      this.usernameFormControl.value!,
      this.passwordFormControl.value!
    );
  }
}
