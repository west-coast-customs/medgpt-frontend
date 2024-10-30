import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateChatComponent } from '../../features/chat/create/create-chat.component';
import { NavigationComponent } from '../../features/navigation/navigation.component';

@Component({
  selector: 'app-chats',
  standalone: true,
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
  imports: [RouterOutlet, CreateChatComponent, NavigationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ChatsComponent {

}
