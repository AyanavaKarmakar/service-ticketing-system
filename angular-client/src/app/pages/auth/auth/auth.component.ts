import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  hide = true;

  username = '';
  password = '';
  userType: 'customer' | 'employee' | '' = '';

  userTypes: string[] = ['customer', 'employee'];

  constructor(private authService: AuthService) {}

  isFormValid(): boolean {
    return this.username !== '' && this.password !== '' && this.userType !== '';
  }

  loginUser(): void {
    this.authService.loginCustomer(this.username, this.password);
  }
}
