import { AuthGuardService } from './services/auth/auth-guard/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth/auth.component';
import { HomeComponent } from './pages/home/home/home.component';
import { CustomerFormDetailsComponent } from './pages/home/home/customer/customer/customer-form-details/customer-form-details.component';

const routes: Routes = [
  // Auth Routes
  {
    path: 'auth',
    component: AuthComponent,
  },

  // Dashboard Route
  {
    path: ':userType/home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    title: 'Dashboard',
  },

  // Customer UserType Routes
  {
    path: 'customer/requestFormDetails/:id',
    component: CustomerFormDetailsComponent,
    canActivate: [AuthGuardService],
    title: 'Request Form Details',
  },

  // Default Route
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
