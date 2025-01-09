import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  PersonalDataFormComponent
} from '../../../../widgets/settings/personal-data-form/personal-data-form.component';
import { SubscriptionCardComponent } from '../../../../widgets/settings/subscription-card/subscription-card.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [PersonalDataFormComponent, SubscriptionCardComponent],
  templateUrl: './settings.page.html',
  styleUrl: './settings.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SettingsPage {

}
