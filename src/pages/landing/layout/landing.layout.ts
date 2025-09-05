import { ChangeDetectionStrategy, Component, inject, Signal, WritableSignal, signal } from '@angular/core';
import { HeaderComponent } from '../../../widgets/header/header.component';
import { MediaService } from '../../../shared/services/media.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { fadeOnEnter } from '../../../shared/utils/animations';
import { LanguageService } from '../../../shared/services/language.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-landing-layout',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, ButtonComponent],
  templateUrl: './landing.layout.html',
  styleUrl: './landing.layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeOnEnter(1000)]
})
export default class LandingLayout {
  mobileView: Signal<boolean | undefined> = toSignal(inject(MediaService).mobileViewObs)
  russianLanguage: Signal<boolean> = inject(LanguageService).russianLanguage

  showCookieBanner: WritableSignal<boolean> = signal(localStorage.getItem('cookieConsent') !== 'true')

  cookieNoticeText: string = $localize`:@@cookies_notice:We use cookies for authorization and for third-party services.`
  okText: string = $localize`:@@ok:OK`

  acceptCookies(): void {
    localStorage.setItem('cookieConsent', 'true')
    this.showCookieBanner.set(false)
  }

  closeCookies(): void {
    this.acceptCookies()
  }
}
