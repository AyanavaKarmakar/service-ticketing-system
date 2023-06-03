import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  hide = true;

  userTypes: string[] = ['customer', 'employee'];

  constructor(private authService: AuthService) {}

  loginUser(): void {
    this.authService.loginCustomer('customer1', '123');
  }
}
