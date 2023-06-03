import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthComponent } from './auth.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MatSelectHarness } from '@angular/material/select/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        BrowserAnimationsModule,
        HttpClientModule,
      ],
      providers: [AuthService, MatSnackBar],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with password hide set to true', () => {
    expect(component.hide).toBeTrue();
  });

  it('should toggle password visibility', () => {
    const passwordInput: HTMLInputElement = fixture.nativeElement.querySelector(
      'input[type="password"]'
    );

    const visibilityButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('button[aria-label="Hide password"]');

    expect(passwordInput.type).toEqual('password');
    expect(visibilityButton.getAttribute('aria-pressed')).toBe('true');

    // first click will show the password
    visibilityButton.click();
    fixture.detectChanges();

    expect(passwordInput.type).toEqual('text');
    expect(visibilityButton.getAttribute('aria-pressed')).toBe('false');

    // second click will hide the password
    visibilityButton.click();
    fixture.detectChanges();

    expect(passwordInput.type).toEqual('password');
    expect(visibilityButton.getAttribute('aria-pressed')).toBe('true');
  });

  it('should have options for user types in the select dropdown', async () => {
    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    const options = await select.getOptions();

    expect(options.length).toBe(component.userTypes.length);

    for (let i = 0; i < options.length; i++) {
      expect(await options[i].getText()).toBe(component.userTypes[i]);
    }
  });
});
