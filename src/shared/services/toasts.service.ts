import { Injectable, signal, WritableSignal } from '@angular/core';

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
  duration?: number;
  timeoutId?: number;
}

const MAX_TOASTS = 5;

@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  #lastToastId: number = 0
  toasts: WritableSignal<Toast[]> = signal<Toast[]>([])

  show(message: string, type: ToastType = ToastType.ERROR, duration: number = 3000): void {
    const toastId: number = ++this.#lastToastId
    const timeoutId: number = setTimeout(() => this.remove(toastId), duration) as unknown as number
    const toast: Toast = { id: toastId, message, type, duration, timeoutId }
    this.toasts.update(toasts => [...toasts, toast])
    if (this.toasts().length === MAX_TOASTS) {
      this.remove(this.toasts().at(0)!.id)
    }
  }

  remove(toastId: number): void {
    this.toasts.update(toasts =>
      toasts.filter(toast => {
        if (toast.id === toastId) {
          clearTimeout(toast.timeoutId)
          return false
        }
        return true
      })
    )
  }
}
