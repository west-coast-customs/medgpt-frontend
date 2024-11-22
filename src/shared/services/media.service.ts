import { Injectable } from '@angular/core';
import { distinctUntilChanged, fromEvent, map, Observable, shareReplay, startWith } from 'rxjs';

export enum Media {
  DESKTOP = 'DESKTOP',
  MOBILE = 'MOBILE',
}

@Injectable({ providedIn: 'root' })
export class MediaService {
  private mediaObs: Observable<Media> = fromEvent<UIEvent>(window, 'resize')
    .pipe(
      map((event: UIEvent) => this.calculateMedia(event.view?.innerWidth ?? window.innerWidth)),
      startWith(this.calculateMedia(window.innerWidth)),
      distinctUntilChanged()
    );

  mobileViewObs: Observable<boolean> = this.mediaObs
    .pipe(
      map((media: Media) => media === Media.MOBILE),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    )

  private calculateMedia(innerWidth: number): Media {
    if (innerWidth > 1024) {
      return Media.DESKTOP;
    } else {
      return Media.MOBILE;
    }
  }
}
