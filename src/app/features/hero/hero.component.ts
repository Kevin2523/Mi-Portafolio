import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../core/services/scroll-animation.service';
import { CvDownloadComponent } from '../../shared/components/cv-download/cv-download.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, CvDownloadComponent],
  template: `
    <section class="min-h-[90vh] flex flex-col md:flex-row items-center justify-center px-6 gap-8 md:gap-16 relative z-10 w-full max-w-6xl mx-auto">
     
      <!-- Left -->
      <div class="flex-1 flex flex-col gap-6 items-start" appScrollReveal="fade-up" [delay]="100">
       
        <!-- Status badge -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 text-sm rounded-full" appScrollReveal="fade-up" [delay]="200">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
          Disponible para proyectos
        </div>

        <!-- Title -->
        <div class="space-y-3" appScrollReveal="fade-up" [delay]="300">
          <p class="text-sm font-mono text-slate-400 dark:text-slate-500">Hola, soy</p>
          <h1 class="text-5xl md:text-7xl font-bold font-display leading-tight">
            <span class="gradient-text relative inline-block cursor-default">
              Kevin Mena
            </span>
          </h1>
          <div class="flex items-center gap-3 mt-2" appScrollReveal="fade-up" [delay]="400">
            <span class="w-8 h-[2px] bg-indigo-500 dark:bg-indigo-400"></span>
            <span class="font-mono text-sm text-slate-500 dark:text-slate-400">Full-Stack Developer & Automatización con IA</span>
          </div>
        </div>

        <!-- Bio -->
        <div class="border-l-2 border-indigo-400 dark:border-indigo-400 pl-5 max-w-xl" appScrollReveal="fade-up" [delay]="500">
          <p class="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Desarrollo software, sitios web y campañas de Google Ads para negocios que quieren vender mejor en internet.
          </p>
          <p class="mt-2 text-sm text-slate-500 dark:text-slate-500">
            Estudiante de Desarrollo y Gestión de Software en UTP Coclé. San Carlos, Panamá.
          </p>
        </div>

        <!-- CTA Buttons -->
                <div class="flex flex-wrap gap-4 mt-2" appScrollReveal="fade-up" [delay]="600">
                  <a href="/proyectos" 
                     class="group relative px-8 py-3.5 rounded-xl font-mono text-sm font-semibold tracking-wide overflow-hidden transition-all duration-300 shadow-md dark:shadow-none">
                    <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-400 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                    <span class="relative z-10 text-white flex items-center gap-2">
                      Ver proyectos
                      <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </span>
                  </a>
        
                  <app-cv-download class="flex items-center"></app-cv-download>
        
                  <a href="https://www.linkedin.com/in/kevin-mena-78b230348" target="_blank" rel="noopener noreferrer"
                                                 class="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 font-mono text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-500/50 dark:hover:border-sky-500/50 transition-all duration-300 bg-sky-50 dark:bg-sky-900/20">
                    <svg class="w-4 h-4 text-sky-600 dark:text-sky-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
        
                  <a href="#contact" 
                     class="px-8 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 font-mono text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-400/40 transition-all duration-300">
                    Contactar
                  </a>
                </div>

        <!-- Tech tags -->
                <div class="flex gap-3 flex-wrap mt-3" appScrollReveal="fade-up" [delay]="700">
                  <span class="px-3 py-1 text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-lg">Angular</span>
                  <span class="px-3 py-1 text-sm text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 rounded-lg">TypeScript</span>
                  <span class="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-lg">NestJS</span>
                  <span class="px-3 py-1 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-lg">n8n / Flowise</span>
                  <span class="px-3 py-1 text-sm text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-500/10 border border-pink-100 dark:border-pink-500/20 rounded-lg">Google Ads</span>
                  <span class="px-3 py-1 text-sm text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 rounded-lg">Docker</span>
                </div>
      </div>

    </section>
  `
})
export class HeroComponent { }
