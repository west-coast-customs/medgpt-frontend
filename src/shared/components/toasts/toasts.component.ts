import { ChangeDetectionStrategy, Component, WritableSignal } from '@angular/core';
import { Toast, ToastsService, ToastType } from '../../services/toasts.service';
import { bounceInLeftOutRight } from '../../utils/animations';

@Component({
  selector: 'app-toasts',
  standalone: true,
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.scss',
  animations: [bounceInLeftOutRight(500)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastsComponent {
  ToastType: typeof ToastType = ToastType

  toasts: WritableSignal<Toast[]> = this.toastsService.toasts

  constructor(private toastsService: ToastsService) {}

  onRemoveToastClick(id: number) {
    this.toastsService.remove(id)
  }
}
