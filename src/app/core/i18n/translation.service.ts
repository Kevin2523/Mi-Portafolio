import { Injectable, signal, computed, effect, ApplicationRef, inject } from '@angular/core';

export type SupportedLanguage = 'es' | 'en' | 'fr';

interface Translations {
  [key: string]: string;
}

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly STORAGE_KEY = 'portfolio_language';
  private readonly DEFAULT_LANG: SupportedLanguage = 'es';
  private appRef = inject(ApplicationRef);

  // Signal para el idioma actual
  currentLang = signal<SupportedLanguage>(this.loadInitialLanguage());

  // Signal para las traducciones cargadas
  private translations = signal<Translations>({});

  // Cache en memoria para cambio instantáneo
  private cache: Partial<Record<SupportedLanguage, Translations>> = {};

  // Computed: idioma actual con fallback
  readonly lang = computed(() => this.currentLang());

  // Computed: verificar si hay traducciones cargadas
  readonly isLoaded = computed(() => Object.keys(this.translations()).length > 0);

  constructor() {
    // Persistir idioma en localStorage
    effect(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, this.currentLang());
      }
    });

    // Cargar idioma inicial inmediatamente
    this.loadTranslations(this.currentLang()).then(() => {
      // Pre-cargar los demás idiomas en segundo plano para cambios instantáneos
      const otherLangs: SupportedLanguage[] = (['es', 'en', 'fr'] as SupportedLanguage[])
        .filter(l => l !== this.currentLang());
      otherLangs.forEach(l => this.fetchLanguageModule(l));
    });
  }

  private loadInitialLanguage(): SupportedLanguage {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(this.STORAGE_KEY) as SupportedLanguage;
      if (stored && this.isSupported(stored)) return stored;
    }
    if (typeof navigator !== 'undefined' && navigator.language) {
      const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
      if (this.isSupported(browserLang)) return browserLang;
    }
    return this.DEFAULT_LANG;
  }

  private isSupported(lang: string): lang is SupportedLanguage {
    return ['es', 'en', 'fr'].includes(lang);
  }

  private async fetchLanguageModule(lang: SupportedLanguage): Promise<Translations | null> {
    if (this.cache[lang]) return this.cache[lang]!;
    try {
      let mod: any;
      if (lang === 'es') {
        mod = await import('../../../assets/i18n/es.json');
      } else if (lang === 'en') {
        mod = await import('../../../assets/i18n/en.json');
      } else if (lang === 'fr') {
        mod = await import('../../../assets/i18n/fr.json');
      }
      const data = mod?.default || mod;
      if (data && typeof data === 'object') {
        this.cache[lang] = data;
        return data;
      }
    } catch (err) {
      console.warn(`Direct module import failed for ${lang}, trying fetch:`, err);
    }

    try {
      const res = await fetch(`/assets/i18n/${lang}.json`);
      if (res.ok) {
        const data = await res.json();
        this.cache[lang] = data;
        return data;
      }
    } catch (fetchErr) {
      console.error(`Fetch fallback failed for ${lang}:`, fetchErr);
    }

    return null;
  }

  async loadTranslations(lang: SupportedLanguage): Promise<void> {
    const data = await this.fetchLanguageModule(lang);
    if (data) {
      this.translations.set(data);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
      this.appRef.tick();
    } else if (lang !== this.DEFAULT_LANG) {
      await this.loadTranslations(this.DEFAULT_LANG);
    }
  }

  async setLanguage(lang: SupportedLanguage): Promise<void> {
    if (!this.isSupported(lang)) return;
    this.currentLang.set(lang);

    // Si ya está en cache, actualizar inmediatamente
    if (this.cache[lang]) {
      this.translations.set(this.cache[lang]!);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
      this.appRef.tick();
    } else {
      await this.loadTranslations(lang);
    }
  }

  translate(key: string, params?: Record<string, string | number>): string {
    const dict = this.translations();
    let translation = dict[key] || key;

    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        translation = translation.replace(new RegExp(`{{${k}}}`, 'g'), String(v));
      });
    }

    return translation;
  }

  getKeys(): string[] {
    return Object.keys(this.translations());
  }
}