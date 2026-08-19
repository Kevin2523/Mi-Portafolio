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
    <section class="min-h-[90vh] flex flex-col md:flex-row items-center justify-center px-6 gap-8 md:gap-16 relative z-10 w-full max-w-6xl mx-auto">
    
      <!-- Left -->
      <div class="flex-1 flex flex-col gap-6 items-start" appScrollReveal="fade-up" [delay]="100">
      
        <!-- Status badge -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 text-sm rounded-full" appScrollReveal="fade-up" [delay]="200">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
          {{ 'hero.status' | t }}
        </div>

        <!-- Title -->
        <div class="space-y-3" appScrollReveal="fade-up" [delay]="300">
          <p class="text-sm font-mono text-slate-400 dark:text-slate-500">{{ 'hero.greeting' | t }}</p>
          <h1 class="text-5xl md:text-7xl font-bold font-display leading-tight">
            <span class="gradient-text relative inline-block cursor-default">
              {{ 'hero.name' | t }}
            </span>
          </h1>
          <div class="flex items-center gap-3 mt-2" appScrollReveal="fade-up" [delay]="400">
            <span class="w-8 h-[2px] bg-indigo-500 dark:bg-indigo-400"></span>
            <span class="font-mono text-sm text-slate-500 dark:text-slate-400">{{ 'hero.title' | t }}</span>
          </div>
        </div>

        <!-- Bio -->
        <div class="border-l-2 border-indigo-400 dark:border-indigo-400 pl-5 max-w-xl" appScrollReveal="fade-up" [delay]="500">
          <p class="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {{ 'hero.bio1' | t }}
          </p>
          <p class="mt-2 text-sm text-slate-500 dark:text-slate-500">
            {{ 'hero.bio2' | t }}
          </p>
        </div>

        <!-- CTA Buttons -->
                <div class="flex flex-col gap-4 mt-2" appScrollReveal="fade-up" [delay]="600">
                 
                  <!-- Primary CTA: Contactar -->
                  <a href="#contact" 
                     class="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-mono text-sm font-semibold tracking-wide overflow-hidden transition-all duration-300 shadow-lg shadow-indigo-500/25 dark:shadow-indigo-400/20 hover:shadow-xl hover:shadow-indigo-500/30 dark:hover:shadow-indigo-400/25 hover:-translate-y-0.5 w-fit">
                    <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-400"></div>
                    <span class="relative z-10 text-white flex items-center gap-2">
                      {{ 'hero.btn.contact' | t }}
                      <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </span>
                  </a>

                  <!-- Secondary: Icon links row -->
                  <div class="flex items-center gap-3">
                    <app-cv-download class="flex items-center justify-center"></app-cv-download>

                    <a href="https://www.linkedin.com/in/kevin-mena-78b230348" target="_blank" rel="noopener noreferrer"
                       class="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-500/50 dark:hover:border-sky-500/50 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all duration-300"
                       aria-label="LinkedIn">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>

                    <a href="https://github.com/Kevin2523" target="_blank" rel="noopener noreferrer"
                       class="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all duration-300"
                       aria-label="GitHub">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>

                    <a href="#projects"
                       class="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-400/40 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300"
                       aria-label="Ver proyectos">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                      </svg>
                    </a>
                  </div>

                </div>
      </div>

    </section>
  `
})
export class HeroComponent { }
