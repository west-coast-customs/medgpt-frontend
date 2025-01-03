import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-chat-navigation',
  standalone: true,
  imports: [ButtonComponent, NgOptimizedImage],
  templateUrl: './chat-navigation.component.html',
  styleUrl: './chat-navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatNavigationComponent {

}
