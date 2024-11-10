import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { fadeOnEnter, fadeOnTrigger } from '../../animations';
import { filter } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterOutlet],
  animations: [fadeOnEnter(1000), fadeOnTrigger(1000)],
  templateUrl: './auth.layout.html',
  styleUrl: './auth.layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AuthLayout {
  navigationEnd = toSignal(
    inject(Router).events.pipe(filter(event => event instanceof NavigationEnd))
  )
}
