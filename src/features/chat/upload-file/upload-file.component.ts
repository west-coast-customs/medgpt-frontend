import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ToastsService, ToastType } from '../../../shared/services/toasts.service';
import { of, switchMap, tap } from 'rxjs';
import { ChatsService } from '../../../entities/chat/api/chats.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProfileService, SubscriptionStatuses } from '../../../entities/profile/api/profile.service';

const ACCEPTED_FORMATS: Map<string, string> = new Map([
  ['application/pdf', 'PDF'],
  ['application/msword', 'DOC'],
  ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'DOCX']
])

const MAX_FILE_SIZE_MB: number = 100
const MAX_FILE_SIZE: number = MAX_FILE_SIZE_MB * 1024 * 1024

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [NgOptimizedImage, ButtonComponent],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadFileComponent {
  viableSubscription: Signal<boolean> = computed(() => this.profileService.subscription()?.status === SubscriptionStatuses.ACTIVE)

  constructor(private toastsService: ToastsService,
              private chatsService: ChatsService,
              private profileService: ProfileService,
              private destroyRef: DestroyRef) {
  }

  fileUploading: WritableSignal<boolean> = signal(false)

  onFileSelected(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement

    if (!target.files) {
      return
    }

    const file: File = target.files.item(0)!

    const correctFileType: boolean = [...ACCEPTED_FORMATS.keys()]
      .some((acceptType: string) => file?.type.includes(acceptType))

    if (!correctFileType) {
      this.toastsService.show(`${ $localize`:@@file_format_error:Incorrect file format` }.\n${ $localize`:@@accepted_formats:Accepted formats` }:${ [...ACCEPTED_FORMATS.values()].join(', ') }`)
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      this.toastsService.show(`${ $localize`:@@maximum_file_size_error:File size should not exceed` } ${ MAX_FILE_SIZE_MB } ${ $localize`:@@mb:MB` }`)
      return
    }

    of(this.fileUploading.set(true))
      .pipe(
        switchMap(() => this.chatsService.uploadFile(file)),
        tap({
          next: () => {
            this.toastsService.show($localize`:@@file_uploaded:File uploaded`, ToastType.SUCCESS)
            this.fileUploading.set(false)
          },
          error: () => {
            this.toastsService.show($localize`:@@file_upload_error:File upload failed`)
            this.fileUploading.set(false)
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe()
  }
}
