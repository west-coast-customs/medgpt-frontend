import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';

export enum Language {
  EN = 'en',
  RU = 'ru'
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLanguage: WritableSignal<Language> = signal(Language.EN)
  russianLanguage: Signal<boolean> = computed(() => this.currentLanguage() === Language.RU)

  constructor() {
    const languageBaseHref: Language = window.location.pathname.split('/')[1] as Language
    const languageAvailable: boolean = Object.values(Language).includes(languageBaseHref)
    if (languageAvailable) {
      this.currentLanguage.set(languageBaseHref)
    }
  }
}
