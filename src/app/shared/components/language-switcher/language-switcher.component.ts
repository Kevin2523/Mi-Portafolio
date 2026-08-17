import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService, SupportedLanguage } from '../../../core/i18n/translation.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      (click)="toggleLanguage()"
      class="inline-flex items-center justify-center gap-1.5 px-3 py-2 min-w-[60px] xl:min-w-[100px] rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900/50 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 shadow-sm dark:shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#0a0a0f]"
      [attr.aria-label]="translationService.lang() === 'es' ? 'Switch to English' : 'Cambiar a Español'"
    >
      <span class="text-base leading-none">{{ translationService.lang() === 'es' ? '🇺🇸' : '🇪🇸' }}</span>
      <span class="hidden xl:inline leading-none mt-[1px] font-bold">{{ translationService.lang() === 'es' ? 'English' : 'Español' }}</span>
      <span class="xl:hidden leading-none mt-[1px] font-bold">{{ translationService.lang() === 'es' ? 'EN' : 'ES' }}</span>
    </button>
  `
})
export class LanguageSwitcherComponent {
  readonly translationService = inject(TranslationService);

  async toggleLanguage(): Promise<void> {
    const nextLang: SupportedLanguage = this.translationService.lang() === 'es' ? 'en' : 'es';
    await this.translationService.setLanguage(nextLang);
  }
}