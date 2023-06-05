import { AuthGuardService } from './services/auth/auth-guard/auth-guard.service';
import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth/auth.component';
import { HomeComponent } from './pages/home/home/home.component';
import { UserService } from './services/user/user.service';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: ':userType/home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule implements OnInit {
  userType: string | null = null;

  constructor(private userService: UserService) {
    this.userType = this.userService.getUserType();
  }

  /**
   * It sets the default route to the user's home page.
   * If the user is not authenticated, the default route is set to the auth page.
   */
  ngOnInit(): void {
    const defaultRoute = this.userType ? `${this.userType}/home` : 'auth';
    routes[2].redirectTo = defaultRoute;
  }
}
