import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth/auth.component';
import { HomeComponent } from './pages/home/home/home.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { AuthGuardService } from './services/auth/auth-guard/auth-guard.service';
import { CustomerComponent } from './pages/home/home/customer/customer/customer.component';
import { CustomerRequestTableComponent } from './pages/home/home/customer/customer/customer-request-table/customer-request-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthComponent,
    HomeComponent,
    CustomerComponent,
    CustomerRequestTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatTableModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatSortModule,
    MatPaginatorModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
  ],
  providers: [AuthService, UserService, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
