import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { GoogleAuthButtonComponent } from "../../../features/auth/google-button/google-auth-button.component";
import { SignupFormComponent } from '../../../features/auth/signup-form/signup-form.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ButtonComponent, RouterLink, NgOptimizedImage, GoogleAuthButtonComponent, SignupFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SignupComponent {

}
