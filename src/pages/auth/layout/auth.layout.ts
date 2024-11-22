import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../widgets/header/header.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { fadeOnEnter, fadeOnTrigger } from '../../../shared/utils/animations';
import { filter } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
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
