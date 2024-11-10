import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MediaService } from '../../services/media.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '../../components/button/button.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { fadeOnEnter } from '../../animations';

@Component({
  selector: 'app-landing-layout',
  standalone: true,
  imports: [HeaderComponent, ButtonComponent, RouterLink, RouterOutlet],
  templateUrl: './landing.layout.html',
  styleUrl: './landing.layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeOnEnter(1000)]
})
export default class LandingLayout {
  mobileView: Signal<boolean | undefined> = toSignal(inject(MediaService).mobileViewObs)
}
