import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  hide = true;

  selectedValue: string = '';

  userTypes: string[] = ['customer', 'employee'];
}
