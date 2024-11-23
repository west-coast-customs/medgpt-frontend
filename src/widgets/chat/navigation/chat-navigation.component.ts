import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogoutButtonComponent } from '../../../features/auth/logout-button/logout-button.component';

@Component({
  selector: 'app-chat-navigation',
  standalone: true,
  imports: [LogoutButtonComponent],
  templateUrl: './chat-navigation.component.html',
  styleUrl: './chat-navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatNavigationComponent {

}
