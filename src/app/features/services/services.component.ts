import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { ScrollRevealDirective } from '../../core/services/scroll-animation.service';
import { TechIconService } from '../../core/services/tech-icon.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NgClass, ScrollRevealDirective, TranslatePipe],
  template: `
    <section id="services" class="py-24 px-6 w-full max-w-6xl mx-auto relative z-10">
      <div class="mb-16" appScrollReveal="fade-up" [delay]="100">
        <p class="font-mono text-[11px] tracking-[0.3em] text-indigo-500 dark:text-indigo-400 uppercase mb-3">{{ 'srv.badge' | t }}</p>
        <h2 class="text-3xl md:text-4xl font-bold font-display text-slate-800 dark:text-white">
          {{ 'services.title' | t }}
        </h2>
        <div class="h-[2px] w-24 bg-gradient-to-r from-indigo-400 via-purple-400 to-transparent mt-4"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (service of services; track service.title; let i = $index) {
          <div class="group relative rounded-2xl p-6 bg-white dark:bg-cyber-900/60 border border-slate-200 dark:border-slate-800/60 shadow-sm hover:shadow-lg hover:shadow-indigo-200/20 dark:hover:shadow-none transition-all duration-300 hover:-translate-y-1"
               appScrollReveal="fade-up" [delay]="(i + 1) * 100">
            
            <!-- Icon -->
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border"
              [ngClass]="service.iconClass">
              <span class="w-6 h-6" [innerHTML]="service.icon"></span>
            </div>

            <!-- Title -->
            <h3 class="text-lg font-bold font-display text-slate-800 dark:text-white mb-2">
              {{ service.title | t }}
            </h3>

            <!-- Description -->
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              {{ service.description | t }}
            </p>

            <!-- Result -->
            <div class="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/70">
              <svg class="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="text-[11px] text-slate-500 dark:text-slate-400">{{ service.result | t }}</span>
            </div>
          </div>
        }
      </div>
    </section>
  `
})
export class ServicesComponent {
  private techIconService = inject(TechIconService);
  private sanitizer = inject(DomSanitizer);

  services = [
    {
      title: 'srv.1.title',
      description: 'srv.1.desc',
      icon: this.getIconSafe('Consultoría'),
      iconClass: 'bg-indigo-50 dark:bg-indigo-400/10 text-indigo-500 dark:text-indigo-400 border-indigo-200 dark:border-indigo-400/30',
      result: 'srv.1.res'
    },
    {
      title: 'srv.2.title',
      description: 'srv.2.desc',
      icon: this.getIconSafe('Angular'),
      iconClass: 'bg-emerald-50 dark:bg-emerald-400/10 text-emerald-500 dark:text-emerald-400 border-emerald-200 dark:border-emerald-400/30',
      result: 'srv.2.res'
    },
    {
      title: 'srv.3.title',
      description: 'srv.3.desc',
      icon: this.getIconSafe('Aplicaciones'),
      iconClass: 'bg-purple-50 dark:bg-purple-400/10 text-purple-500 dark:text-purple-400 border-purple-200 dark:border-purple-400/30',
      result: 'srv.3.res'
    },
    {
      title: 'srv.4.title',
      description: 'srv.4.desc',
      icon: this.getIconSafe('Software'),
      iconClass: 'bg-blue-50 dark:bg-blue-400/10 text-blue-500 dark:text-blue-400 border-blue-200 dark:border-blue-400/30',
      result: 'srv.4.res'
    },
    {
      title: 'srv.5.title',
      description: 'srv.5.desc',
      icon: this.getIconSafe('Base de Datos'),
      iconClass: 'bg-amber-50 dark:bg-amber-400/10 text-amber-500 dark:text-amber-400 border-amber-200 dark:border-amber-400/30',
      result: 'srv.5.res'
    },
    {
      title: 'srv.6.title',
      description: 'srv.6.desc',
      icon: this.getIconSafe('Móvil'),
      iconClass: 'bg-orange-50 dark:bg-orange-400/10 text-orange-500 dark:text-orange-400 border-orange-200 dark:border-orange-400/30',
      result: 'srv.6.res'
    },
    {
      title: 'srv.7.title',
      description: 'srv.7.desc',
      icon: this.getIconSafe('SaaS'),
      iconClass: 'bg-rose-50 dark:bg-rose-400/10 text-rose-500 dark:text-rose-400 border-rose-200 dark:border-rose-400/30',
      result: 'srv.7.res'
    },
    {
      title: 'srv.8.title',
      description: 'srv.8.desc',
      icon: this.getIconSafe('Google Ads'),
      iconClass: 'bg-indigo-50 dark:bg-indigo-400/10 text-indigo-500 dark:text-indigo-400 border-indigo-200 dark:border-indigo-400/30',
      result: 'srv.8.res'
    },
    {
      title: 'srv.9.title',
      description: 'srv.9.desc',
      icon: this.getIconSafe('PowerBI'),
      iconClass: 'bg-yellow-50 dark:bg-yellow-400/10 text-yellow-500 dark:text-yellow-400 border-yellow-200 dark:border-yellow-400/30',
      result: 'srv.9.res'
    },
    {
      title: 'srv.10.title',
      description: 'srv.10.desc',
      icon: this.getIconSafe('n8n'),
      iconClass: 'bg-cyan-50 dark:bg-cyan-400/10 text-cyan-500 dark:text-cyan-400 border-cyan-200 dark:border-cyan-400/30',
      result: 'srv.10.res'
    },
    {
      title: 'srv.11.title',
      description: 'srv.11.desc',
      icon: this.getIconSafe('Nube'),
      iconClass: 'bg-teal-50 dark:bg-teal-400/10 text-teal-500 dark:text-teal-400 border-teal-200 dark:border-teal-400/30',
      result: 'srv.11.res'
    }
  ];

  getIconSafe(tech: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.techIconService.getIcon(tech));
  }
}