import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatWindowComponent } from '../../entities/chat/window/chat-window.component';
import { ChatInputComponent } from '../../features/chat/input/chat-input.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  imports: [
    ChatWindowComponent,
    ChatInputComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ChatComponent {
}
