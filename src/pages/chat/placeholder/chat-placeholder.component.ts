import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DescriptionCardsComponent } from "../../../widgets/description-cards/description-cards.component";
import { InputComponent } from '../../../shared/components/input/input.component';
import { ChatInputComponent } from '../../../features/chat/input/chat-input.component';

@Component({
  selector: 'app-chat-placeholder',
  standalone: true,
  imports: [DescriptionCardsComponent, InputComponent, ChatInputComponent],
  templateUrl: './chat-placeholder.component.html',
  styleUrl: './chat-placeholder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ChatPlaceholderComponent {

}
