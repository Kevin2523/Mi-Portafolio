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
    <div class="flex flex-col lg:flex-row items-center justify-between gap-8 p-6 sm:p-8 md:p-10 relative overflow-hidden h-full" appScrollReveal="fade-up" [delay]="100">
      
      <!-- Subtle ambient glow in background -->
      <div class="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Left / Main Info Column -->
      <div class="flex flex-col justify-between flex-1 w-full relative z-10">
        
        <!-- Top Status & Location Badges -->
        <div class="flex flex-wrap items-center gap-2.5 mb-5">
          <!-- Status badge -->
          <div class="inline-flex items-center gap-2 px-3 py-1 border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium rounded-full backdrop-blur-sm">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {{ 'hero.status' | t }}
          </div>

          <!-- Location badge -->
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-xs text-slate-500 dark:text-slate-400">
            <svg class="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>San Carlos, Panamá</span>
          </div>
        </div>

        <!-- Name & Title -->
        <div class="space-y-2 mb-6">
          <p class="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <span class="w-4 h-px bg-amber-500"></span>
            {{ 'hero.greeting' | t }}
          </p>
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
            {{ 'hero.name' | t }}
          </h1>
          <div class="flex items-center gap-2">
            <span class="font-mono text-sm sm:text-base font-medium text-amber-600 dark:text-amber-400">{{ 'hero.title' | t }}</span>
          </div>
        </div>

        <!-- Bio Quote Box -->
        <div class="border-l-2 border-amber-500/50 pl-4 py-1 mb-7 bg-amber-500/[0.02] rounded-r-lg">
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {{ 'hero.bio1' | t }}
          </p>
          <p class="mt-1.5 text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
            <svg class="w-3.5 h-3.5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
            </svg>
            {{ 'hero.bio2' | t }}
          </p>
        </div>

        <!-- CTAs & Socials Row - Fully Responsive & Aligned -->
        <div class="flex flex-wrap items-center gap-3 pt-1">
          <!-- Primary: Contact button -->
          <a href="#contact"
             class="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono text-sm font-semibold tracking-wide overflow-hidden transition-all duration-300 shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 active:scale-95">
            <div class="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 group-hover:from-amber-600 group-hover:to-amber-700 transition-colors"></div>
            <span class="relative z-10 text-white flex items-center gap-2">
              {{ 'hero.btn.contact' | t }}
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </span>
          </a>

          <!-- Secondary: CV Download -->
          <div class="inline-flex items-center">
            <app-cv-download></app-cv-download>
          </div>

          <!-- Social / Action Icons group -->
          <div class="inline-flex items-center gap-2">
            <a href="https://www.linkedin.com/in/kevin-mena-78b230348" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-sky-500 hover:border-sky-500/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shadow-2xs"
               aria-label="LinkedIn" title="LinkedIn">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            <a href="https://github.com/Kevin2523" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shadow-2xs"
               aria-label="GitHub" title="GitHub">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            <a href="#projects"
               class="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-amber-500 hover:border-amber-500/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shadow-2xs"
               aria-label="Ver proyectos" title="Ver proyectos">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Right / Photo & Quick Stats Column -->
      <div class="flex flex-col items-center justify-center lg:w-72 flex-shrink-0 relative z-10 w-full p-2 lg:p-0">
        <!-- Photo Container with Double Halo Glow -->
        <div class="relative mb-5 group">
          <div class="absolute -inset-2 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 opacity-40 blur-md group-hover:opacity-75 transition duration-500"></div>
          <img src="/profile.png" alt="Kevin Mena"
               class="relative w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-xl">
          <span class="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-sm" title="Online"></span>
        </div>

        <!-- Integrated Metrics -->
        <div class="grid grid-cols-2 gap-2.5 w-full">
          <div class="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 text-center">
            <p class="text-2xl font-bold font-display text-amber-500 dark:text-amber-400">4+</p>
            <p class="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">{{ 'about.stats.projectsLabel' | t }}</p>
          </div>
          <div class="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 text-center">
            <p class="text-2xl font-bold font-display text-slate-800 dark:text-white">12+</p>
            <p class="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">{{ 'about.stats.techLabel' | t }}</p>
          </div>
        </div>
      </div>

    </div>
  `
})
export class HeroComponent {}
