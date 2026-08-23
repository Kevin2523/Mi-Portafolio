import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../core/services/scroll-animation.service';
import { CvDownloadComponent } from '../../shared/components/cv-download/cv-download.component';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, CvDownloadComponent, TranslatePipe],
  template: `
    <div class="flex flex-col justify-center gap-6 p-6 sm:p-8 md:p-10 h-full relative overflow-hidden" appScrollReveal="fade-up" [delay]="100">

      <!-- Subtle ambient glow -->
      <div class="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/5 dark:bg-amber-500/3 rounded-full blur-3xl pointer-events-none"></div>

      <div class="relative z-10 max-w-xl">
        <!-- Greeting -->
        <p class="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2 mb-3">
          <span class="w-4 h-px bg-amber-500"></span>
          {{ 'hero.greeting' | t }}
        </p>

        <!-- Name -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-slate-900 dark:text-white mb-3">
          {{ 'hero.name' | t }}
        </h1>

        <!-- Title -->
        <p class="font-mono text-sm sm:text-base font-medium text-amber-600 dark:text-amber-400 mb-5">
          {{ 'hero.title' | t }}
        </p>

        <!-- Bio -->
        <div class="border-l-2 border-amber-500/40 pl-4 mb-6">
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {{ 'hero.bio1' | t }}
          </p>
          <p class="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
            {{ 'hero.bio2' | t }}
          </p>
        </div>

        <!-- CTAs — all uniform style -->
        <div class="flex flex-wrap items-center gap-2.5">
          <!-- Contactar (primary) -->
          <a href="#contact"
             class="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-sm font-semibold tracking-wide overflow-hidden transition-all duration-300 shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 active:scale-95">
            <div class="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 group-hover:from-amber-600 group-hover:to-amber-700 transition-colors"></div>
            <span class="relative z-10 text-white flex items-center gap-2">
              {{ 'hero.btn.contact' | t }}
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </span>
          </a>

          <!-- CV -->
          <app-cv-download></app-cv-download>

          <!-- LinkedIn -->
          <a href="https://www.linkedin.com/in/kevin-mena-78b230348" target="_blank" rel="noopener noreferrer"
             class="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 hover:text-sky-500 hover:border-sky-500/40 active:scale-95 transition-all duration-200"
             aria-label="LinkedIn" title="LinkedIn">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>

          <!-- GitHub -->
          <a href="https://github.com/Kevin2523" target="_blank" rel="noopener noreferrer"
             class="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 active:scale-95 transition-all duration-200"
             aria-label="GitHub" title="GitHub">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>

          <!-- Proyectos -->
          <a href="#projects"
             class="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 hover:text-amber-500 hover:border-amber-500/40 active:scale-95 transition-all duration-200"
             aria-label="Ver proyectos" title="Ver proyectos">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `
})
export class HeroComponent {}
