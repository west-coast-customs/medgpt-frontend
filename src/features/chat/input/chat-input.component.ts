import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  model,
  ModelSignal,
  Signal,
  viewChild
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ChatService } from '../../../shared/services/chat.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    InputComponent
  ],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatInputComponent {
  waitingBotResponse: Signal<boolean> = this.chatService.waitingBotResponse

  inputText: ModelSignal<string> = model<string>('')
  inputTextEmpty: Signal<boolean> = computed(() => !this.inputText()?.trim().length)

  private inputElement = viewChild<ElementRef<HTMLInputElement>>('input')

  constructor(private chatService: ChatService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.focusInput())

    effect(() => {
      if (!this.waitingBotResponse()) {
        this.focusInput()
      }
    });
  }

  onInput(): void {
    this.chatService.send(this.inputText())
    this.inputText.set('')
  }

  focusInput(): void {
    setTimeout(() => this.inputElement()?.nativeElement.focus())
  }
}
