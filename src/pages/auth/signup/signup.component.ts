import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SignupComponent {

}
