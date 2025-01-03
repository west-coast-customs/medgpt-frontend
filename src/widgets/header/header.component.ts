import { ChangeDetectionStrategy, Component, inject, Signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { LanguageSwitcherComponent } from '../../features/language-switcher/language-switcher.component';
import { LogoutButtonComponent } from '../../features/logout-button/logout-button.component';
import { AuthService } from '../../shared/services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaService } from '../../shared/services/media.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ButtonComponent, LanguageSwitcherComponent, LogoutButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  loggedIn: WritableSignal<boolean> = inject(AuthService).loggedIn
  mobileView: Signal<boolean | undefined> = toSignal(inject(MediaService).mobileViewObs)

  hideHeaderButton: boolean = inject(ActivatedRoute).snapshot.data['hideHeaderButton']
}
