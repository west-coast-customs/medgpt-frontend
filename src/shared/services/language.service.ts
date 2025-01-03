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
  englishLanguage: Signal<boolean> = computed(() => this.currentLanguage() === Language.EN)

  #languageBaseHref: Language = window.location.pathname.split('/')[1] as Language

  constructor() {
    const languageAvailable: boolean = Object.values(Language).includes(this.#languageBaseHref)
    if (languageAvailable) {
      this.currentLanguage.set(this.#languageBaseHref)
    }
  }

  changeLanguage(language: Language): void {
    const pathName: string[] = window.location.pathname.split('/')
    pathName[1] = language
    window.location.pathname = pathName.join('/')
  }
}
