import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService, SupportedLanguage } from '../../../core/i18n/translation.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lang-switch-group" role="group" aria-label="Selector de idioma">
      <button
        type="button"
        class="lang-pill-btn"
        [class.is-active]="translationService.lang() === 'es'"
        (click)="setLanguage('es')"
        aria-label="Cambiar idioma a Español"
        [attr.aria-pressed]="translationService.lang() === 'es'"
      >
        ES
      </button>
      <span class="lang-pill-sep" aria-hidden="true">|</span>
      <button
        type="button"
        class="lang-pill-btn"
        [class.is-active]="translationService.lang() === 'en'"
        (click)="setLanguage('en')"
        aria-label="Switch language to English"
        [attr.aria-pressed]="translationService.lang() === 'en'"
      >
        EN
      </button>
    </div>
  `
})
export class LanguageSwitcherComponent {
  readonly translationService = inject(TranslationService);

  async setLanguage(lang: SupportedLanguage): Promise<void> {
    await this.translationService.setLanguage(lang);
  }
}