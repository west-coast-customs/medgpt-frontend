import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { NgClass } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass, LoaderComponent, RouterLink, RouterLinkActive],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  disabled: InputSignal<boolean> = input<boolean>(false)
  customClass: InputSignal<string> = input<string>('')
  loading: InputSignal<boolean> = input<boolean>(false)
  buttonType: InputSignal<'button' | 'submit'> = input<'button' | 'submit'>('button')

  link: InputSignal<string | null> = input<string | null>(null)
  linkActive: InputSignal<string> = input<string>('')
}
