import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DescriptionCardsComponent } from "../../../widgets/description-cards/description-cards.component";
import { FormInputComponent } from '../../../shared/components/form/input/form-input.component';
import { ChatInputComponent } from '../../../features/chat/input/chat-input.component';

@Component({
  selector: 'app-chat-placeholder',
  standalone: true,
  imports: [DescriptionCardsComponent, FormInputComponent, ChatInputComponent],
  templateUrl: './chat-placeholder.component.html',
  styleUrl: './chat-placeholder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ChatPlaceholderComponent {

}
