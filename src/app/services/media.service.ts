import { Injectable } from '@angular/core';
import { distinctUntilChanged, fromEvent, map, Observable, shareReplay, startWith } from 'rxjs';

export enum MEDIA {
  DESKTOP = 'DESKTOP',
  MOBILE = 'MOBILE',
}

@Injectable({ providedIn: 'root' })
export class MediaService {
  private mediaObs: Observable<MEDIA> = fromEvent<UIEvent>(window, 'resize')
    .pipe(
      map((event: UIEvent) => this.calculateMedia(event.view?.innerWidth ?? window.innerWidth)),
      startWith(this.calculateMedia(window.innerWidth)),
      distinctUntilChanged()
    );

  mobileViewObs: Observable<boolean> = this.mediaObs
    .pipe(
      map((media: MEDIA) => media === MEDIA.MOBILE),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    )

  private calculateMedia(innerWidth: number): MEDIA {
    if (innerWidth > 1024) {
      return MEDIA.DESKTOP;
    } else {
      return MEDIA.MOBILE;
    }
  }
}
