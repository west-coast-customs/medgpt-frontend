import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { NgOptimizedImage } from '@angular/common';
import { GoogleAuthButtonComponent } from '../../../features/auth/google-button/google-auth-button.component';
import { LoginFormComponent } from '../../../features/auth/login-form/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ButtonComponent, NgOptimizedImage, GoogleAuthButtonComponent, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LoginComponent {

}
