import { Component, HostListener, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UiStateService } from './core/services/ui-state.service';
import { SkipLinkComponent } from './core/services/skip-link.component';
import { LanguageSwitcherComponent } from './shared/components/language-switcher/language-switcher.component';
import { TranslatePipe } from './core/i18n/translate.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SkipLinkComponent, LanguageSwitcherComponent, TranslatePipe],
  template: `
    <div [class.dark]="uiState.isDarkMode()">
      <app-skip-link></app-skip-link>

      <div class="progress-rail" aria-hidden="true">
        <span id="scrollProgress" [style.width.%]="scrollProgress()"></span>
      </div>

      <header class="site-header" id="siteHeader" [class.is-compact]="isCompact()">
        <a class="brand" href="#inicio" aria-label="Kevin Mena, ir al inicio">
          <span class="brand-mark" aria-hidden="true">KM</span>
          <span>Kevin Mena</span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="main-nav" id="mainNav" aria-label="Navegación principal">
          <a href="#inicio" [class.is-active]="activeSection() === 'inicio'" (click)="navigateTo('inicio')">{{ 'header.nav.home' | t }}</a>
          <a href="#sobre-mi" [class.is-active]="activeSection() === 'sobre-mi'" (click)="navigateTo('sobre-mi')">{{ 'header.nav.about' | t }}</a>
          <a href="#proyectos" [class.is-active]="activeSection() === 'proyectos'" (click)="navigateTo('proyectos')">{{ 'header.nav.projects' | t }}</a>
          <a href="#servicios" [class.is-active]="activeSection() === 'servicios'" (click)="navigateTo('servicios')">{{ 'header.nav.services' | t }}</a>
          <a href="#proceso" [class.is-active]="activeSection() === 'proceso'" (click)="navigateTo('proceso')">{{ 'header.nav.process' | t }}</a>
          <a href="#experiencia" [class.is-active]="activeSection() === 'experiencia'" (click)="navigateTo('experiencia')">{{ 'header.nav.experience' | t }}</a>
          <a href="#habilidades" [class.is-active]="activeSection() === 'habilidades'" (click)="navigateTo('habilidades')">{{ 'header.nav.skills' | t }}</a>
          <a href="#contacto" [class.is-active]="activeSection() === 'contacto'" (click)="navigateTo('contacto')">{{ 'header.nav.contact' | t }}</a>
        </nav>

        <div class="header-actions">
          <app-language-switcher></app-language-switcher>

          <button
            class="theme-toggle"
            id="themeToggle"
            type="button"
            [attr.aria-pressed]="uiState.isDarkMode()"
            (click)="uiState.toggleTheme()"
          >
            <span aria-hidden="true">{{ uiState.isDarkMode() ? '☾' : '☀' }}</span>
            <span class="theme-label">{{ (uiState.isDarkMode() ? 'common.dark' : 'common.light') | t }}</span>
          </button>
        </div>
      </header>

      <main id="main-content">
        <router-outlet></router-outlet>
      </main>

      <!-- Instagram-Style Bottom Navigation for Mobile -->
      <nav class="mobile-bottom-nav" aria-label="Navegación móvil">
        <button
          type="button"
          class="bottom-nav-item"
          [class.is-active]="isSectionActive('inicio')"
          (click)="navigateTo('inicio')"
          [attr.aria-label]="'header.nav.home' | t"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" [attr.fill]="isSectionActive('inicio') ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5H10v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
          </svg>
        </button>

        <button
          type="button"
          class="bottom-nav-item"
          [class.is-active]="isSectionActive('proyectos')"
          (click)="navigateTo('proyectos')"
          [attr.aria-label]="'header.nav.projects' | t"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" [attr.fill]="isSectionActive('proyectos') ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1.5"/>
            <rect x="14" y="3" width="7" height="7" rx="1.5"/>
            <rect x="3" y="14" width="7" height="7" rx="1.5"/>
            <rect x="14" y="14" width="7" height="7" rx="1.5"/>
          </svg>
        </button>

        <button
          type="button"
          class="bottom-nav-item"
          [class.is-active]="isSectionActive('servicios')"
          (click)="navigateTo('servicios')"
          [attr.aria-label]="'header.nav.services' | t"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"/>
            <polyline points="2 17 12 22 22 17"/>
            <polyline points="2 12 12 17 22 12"/>
          </svg>
        </button>

        <button
          type="button"
          class="bottom-nav-item"
          [class.is-active]="isSectionActive('contacto')"
          (click)="navigateTo('contacto')"
          [attr.aria-label]="'header.nav.contact' | t"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" [attr.fill]="isSectionActive('contacto') ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
          <span class="nav-badge-dot" aria-hidden="true"></span>
        </button>

        <button
          type="button"
          class="bottom-nav-item nav-item-profile"
          [class.is-active]="isSectionActive('sobre-mi')"
          (click)="navigateTo('sobre-mi')"
          [attr.aria-label]="'header.nav.about' | t"
        >
          <span class="nav-story-ring" [class.is-active]="isSectionActive('sobre-mi')">
            <span class="nav-avatar-inner">KM</span>
          </span>
        </button>
      </nav>

      <footer>
        <span class="footer-copy">Kevin Mena · © 2026</span>
        <span class="footer-loc">{{ 'footer.location' | t }}</span>
        <a href="https://menastudios.tech" target="_blank" rel="noopener noreferrer" aria-label="Visitar Mena Studios" class="footer-signature">
          <span class="signature-label">{{ 'footer.developedBy' | t }}</span>
          <svg class="mena-logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 240" role="img" aria-labelledby="portfolio-mena-title portfolio-mena-description">
            <title id="portfolio-mena-title">Mena Studios</title>
            <desc id="portfolio-mena-description">Logo de Mena Studios</desc>
            <defs><filter id="portfolio-mena-shadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#000" flood-opacity=".18"/></filter></defs>
            <path d="M37 184V63c0-20 24-29 37-14l52 62 51-62c14-16 39-6 39 15v23c0 22-18 34-48 34h-29c-29 0-47 11-47 32 0 22 20 35 50 35h83" fill="none" stroke="currentColor" stroke-width="25" stroke-linecap="round" stroke-linejoin="round" filter="url(#portfolio-mena-shadow)"/>
            <text x="273" y="108" fill="currentColor" font-family="Arial, Helvetica, sans-serif" font-size="53" font-weight="800" letter-spacing="1">MENA</text>
            <text x="274" y="164" fill="currentColor" fill-opacity=".96" font-family="Arial, Helvetica, sans-serif" font-size="35" font-weight="700" letter-spacing="4">STUDIOS</text>
          </svg>
        </a>
      </footer>
    </div>
  `
})
export class AppComponent implements OnInit {
  uiState = inject(UiStateService);

  scrollProgress = signal<number>(0);
  isCompact = signal<boolean>(false);
  activeSection = signal<string>('inicio');

  ngOnInit(): void {
    this.updateScrollUI();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateScrollUI();
    this.updateActiveSection();
  }

  updateScrollUI(): void {
    if (typeof window === 'undefined') return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    this.scrollProgress.set(Math.min(100, ratio * 100));
    this.isCompact.set(window.scrollY > 24);
  }

  updateActiveSection(): void {
    if (typeof window === 'undefined') return;
    const sections = ['inicio', 'sobre-mi', 'proyectos', 'servicios', 'proceso', 'experiencia', 'habilidades', 'contacto'];
    for (const sec of sections) {
      const el = document.getElementById(sec);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 300 && rect.bottom >= 150) {
          this.activeSection.set(sec);
          break;
        }
      }
    }
  }

  isSectionActive(secId: string): boolean {
    const current = this.activeSection();
    if (current === secId) return true;
    if (secId === 'servicios' && (current === 'proceso')) return true;
    if (secId === 'sobre-mi' && (current === 'experiencia' || current === 'habilidades')) return true;
    return false;
  }

  navigateTo(secId: string): void {
    this.activeSection.set(secId);
    const targetId = secId === 'sobre-mi' ? 'masterBinder' : secId;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    if (secId === 'sobre-mi') {
      const binderBtn = document.getElementById('binderCover');
      if (binderBtn && binderBtn.getAttribute('aria-expanded') === 'false') {
        binderBtn.click();
      }
    }
  }
}
