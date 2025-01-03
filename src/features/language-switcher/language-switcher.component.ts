import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { Language, LanguageService } from '../../shared/services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSwitcherComponent {
  Language: typeof Language = Language
  russianLanguage: Signal<boolean> = this.languageService.russianLanguage;
  englishLanguage: Signal<boolean> = this.languageService.englishLanguage;

  constructor(private languageService: LanguageService) {}

  onLanguageClick(language: Language) {
    this.languageService.changeLanguage(language);
  }
}
