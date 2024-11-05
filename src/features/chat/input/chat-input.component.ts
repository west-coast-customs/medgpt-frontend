import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  ModelSignal,
  Signal,
  viewChild
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ChatService } from '../../../shared/services/chat.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [NgOptimizedImage, ReactiveFormsModule, InputComponent, FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatInputComponent {
  disabled = input<boolean>(false)

  waitingBotResponse: Signal<boolean> = this.chatService.waitingBotResponse

  inputText: ModelSignal<string> = model<string>('')
  inputTextEmpty: Signal<boolean> = computed(() => !this.inputText()?.trim().length)

  inputDisabled = computed(() => this.disabled() || this.waitingBotResponse())
  inputButtonDisabled = computed(() => this.inputDisabled() || this.inputTextEmpty())

  private input = viewChild<InputComponent>(InputComponent)

  constructor(private chatService: ChatService,
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

  onInput(): void {
    this.chatService.send(this.inputText())
    this.inputText.set('')
  }
}
