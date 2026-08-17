import { Injectable, signal, computed, effect } from '@angular/core';

export type SupportedLanguage = 'es' | 'en' | 'fr';

interface Translations {
  [key: string]: string;
}

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly STORAGE_KEY = 'portfolio_language';
  private readonly DEFAULT_LANG: SupportedLanguage = 'es';

  // Signal para el idioma actual
  currentLang = signal<SupportedLanguage>(this.loadInitialLanguage());

  // Signal para las traducciones cargadas
  private translations = signal<Translations>({});

  // Computed: idioma actual con fallback
  readonly lang = computed(() => this.currentLang());

  // Computed: verificar si hay traducciones cargadas
  readonly isLoaded = computed(() => Object.keys(this.translations()).length > 0);

  constructor() {
    // Efecto para persistir el idioma
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, this.currentLang());
    });

    // Cargar traducciones iniciales
    this.loadTranslations(this.currentLang());
  }

  private loadInitialLanguage(): SupportedLanguage {
    const stored = localStorage.getItem(this.STORAGE_KEY) as SupportedLanguage;
    if (stored && this.isSupported(stored)) return stored;
    const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
    if (this.isSupported(browserLang)) return browserLang;
    return this.DEFAULT_LANG;
  }

  private isSupported(lang: string): lang is SupportedLanguage {
    return ['es', 'en', 'fr'].includes(lang);
  }

  async loadTranslations(lang: SupportedLanguage): Promise<void> {
    try {
      const module = await import(`../../../assets/i18n/${lang}.json`);
      this.translations.set(module.default || module);
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error);
      if (lang !== this.DEFAULT_LANG) {
        await this.loadTranslations(this.DEFAULT_LANG);
      }
    }
  }

  async setLanguage(lang: SupportedLanguage): Promise<void> {
    if (!this.isSupported(lang)) return;
    this.currentLang.set(lang);
    await this.loadTranslations(lang);
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

  // Método para obtener todas las claves disponibles (útil para debugging)
  getKeys(): string[] {
    return Object.keys(this.translations());
  }
}