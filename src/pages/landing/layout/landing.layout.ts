import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { HeaderComponent } from '../../../widgets/header/header.component';
import { MediaService } from '../../../shared/services/media.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { fadeOnEnter } from '../../../shared/utils/animations';
import { LanguageService } from '../../../shared/services/language.service';

@Component({
  selector: 'app-landing-layout',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './landing.layout.html',
  styleUrl: './landing.layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeOnEnter(1000)]
})
export default class LandingLayout {
  mobileView: Signal<boolean | undefined> = toSignal(inject(MediaService).mobileViewObs)
  russianLanguage: Signal<boolean> = inject(LanguageService).russianLanguage
}
