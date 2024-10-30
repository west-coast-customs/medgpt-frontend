import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';
import { InputComponent } from '../../shared/components/input/input.component';
import { CardComponent } from "../../shared/components/card/card.component";
import { DescriptionCardsComponent } from '../../shared/components/description-cards/description-cards.component';

const NEW_CHAT_ID: string = 'new'

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  imports: [
    NgOptimizedImage,
    InputComponent,
    CardComponent,
    DescriptionCardsComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ChatComponent {
  #chatIdObs: Observable<string> = inject(ActivatedRoute).params
    .pipe(map((params: Params) => params['id']))

  #chatId: Signal<string | undefined> = toSignal(this.#chatIdObs)
  newChat: Signal<boolean> = computed(() => this.#chatId() === NEW_CHAT_ID)
}
