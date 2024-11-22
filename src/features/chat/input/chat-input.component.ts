import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  input,
  model,
  ModelSignal,
  OnInit,
  Signal,
  viewChild
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../../../shared/components/form/input/form-input.component';
import { ActiveChatService } from '../../../entities/chat/api/active-chat.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { FormFieldComponent } from "../../../shared/components/form/field/form-field.component";
import { Chat, ChatsService } from '../../../entities/chat/api/chats.service';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [NgOptimizedImage, ReactiveFormsModule, FormInputComponent, FormsModule, FormFieldComponent],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatInputComponent implements OnInit {
  disabled = input<boolean>(false)

  waitingBotResponse: Signal<boolean> = this.activeChatService.waitingBotResponse

  inputText: ModelSignal<string> = model<string>('')
  inputTextEmpty: Signal<boolean> = computed(() => !this.inputText()?.trim().length)

  inputDisabled = computed(() => this.disabled() || this.waitingBotResponse())
  inputButtonDisabled = computed(() => this.inputDisabled() || this.inputTextEmpty())

  private input = viewChild<FormInputComponent>(FormInputComponent)

  constructor(private activeChatService: ActiveChatService,
              private chatsService: ChatsService,
              private router: Router,
              private destroyRef: DestroyRef,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.input()?.focus())

    effect(() => {
      if (!this.waitingBotResponse()) {
        this.input()?.focus()
      }
    });
  }

  ngOnInit(): void {
    const initialMessage: string = this.router.lastSuccessfulNavigation?.extras.state?.['message']

    if (initialMessage) {
      this.activeChatService.send(initialMessage)
      void this.router.navigate([], {
        relativeTo: this.activatedRoute,
        replaceUrl: true,
        onSameUrlNavigation: 'reload'
      })
    }
  }

  onInput(): void {
    if (!this.activeChatService.activeChatId()) {
      this.chatsService.create()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((chat: Chat) => {
          void this.router.navigate([chat.id], {
            relativeTo: this.activatedRoute,
            state: { message: this.inputText() }
          })
        })
    } else {
      this.activeChatService.send(this.inputText())
      this.inputText.set('')
    }
  }
}
