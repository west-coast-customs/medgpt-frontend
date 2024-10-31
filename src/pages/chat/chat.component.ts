import { ChangeDetectionStrategy, Component, inject, OnDestroy, Signal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';
import { InputComponent } from '../../shared/components/input/input.component';
import { CardComponent } from "../../shared/components/card/card.component";
import { DescriptionCardsComponent } from '../../shared/components/description-cards/description-cards.component';
import { ChatWindowComponent } from '../../entities/chat/window/chat-window.component';
import { ChatService } from '../../shared/services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  imports: [
    NgOptimizedImage,
    InputComponent,
    CardComponent,
    DescriptionCardsComponent,
    ChatWindowComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ChatComponent implements OnDestroy {
  #chatIdObs: Observable<string> = inject(ActivatedRoute).params
    .pipe(map((params: Params) => params['id']))

  waitingBotResponse: Signal<boolean> = this.chatService.waitingBotResponse

  constructor(protected chatService: ChatService) {
    this.#chatIdObs
      .pipe(
        tap((id: string) => this.chatService.connect(id)),
        takeUntilDestroyed()
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.chatService.disconnect()
  }
}
