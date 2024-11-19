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
import { FormInputComponent } from '../../../shared/components/form/input/form-input.component';
import { ChatService } from '../../../shared/services/chat.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FormFieldComponent } from "../../../shared/components/form/field/form-field.component";

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [NgOptimizedImage, ReactiveFormsModule, FormInputComponent, FormsModule, FormFieldComponent],
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

  private input = viewChild<FormInputComponent>(FormInputComponent)

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
