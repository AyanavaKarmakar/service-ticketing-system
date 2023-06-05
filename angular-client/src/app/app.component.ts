import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && !event.urlAfterRedirects) {
        this.handleNavigation();
      }
    });
  }

  private handleNavigation(): void {
    const isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated && this.router.url.includes('/auth')) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['auth']);
    }
  }
}
