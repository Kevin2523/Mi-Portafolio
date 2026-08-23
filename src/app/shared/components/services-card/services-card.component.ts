import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { TechIconService } from '../../../core/services/tech-icon.service';

@Component({
  selector: 'app-services-card',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="p-7 h-full flex flex-col justify-between">
      <div>
        <p class="font-mono text-[10px] tracking-[0.2em] text-amber-500 uppercase font-semibold mb-1">{{ 'srv.badge' | t }}</p>
        <h3 class="text-xl font-bold font-display text-slate-900 dark:text-white mb-4">{{ 'services.title' | t }}</h3>

        <div class="space-y-1.5">
          @for (service of services; track service.title) {
            <div class="flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 hover:border-amber-500/40 hover:bg-amber-500/[0.04] transition-all duration-200 group">
              <div class="flex items-center gap-3">
                <span class="w-4 h-4 text-amber-500 flex-shrink-0" [innerHTML]="getIconSafe(service.icon)"></span>
                <span class="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{{ service.title | t }}</span>
              </div>
              <svg class="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          }
        </div>
      </div>

      <div class="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
        <span>Soluciones a medida</span>
        <span class="text-amber-500 font-semibold">100% Personalizado</span>
      </div>
    </div>
  `
})
export class ServicesCardComponent {
  private techIconService = inject(TechIconService);
  private sanitizer = inject(DomSanitizer);

  services = [
    { title: 'srv.2.title', icon: 'Angular' },
    { title: 'srv.6.title', icon: 'Móvil' },
    { title: 'srv.7.title', icon: 'SaaS' },
    { title: 'srv.8.title', icon: 'Google Ads' },
    { title: 'srv.10.title', icon: 'n8n' }
  ];

  getIconSafe(tech: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.techIconService.getIcon(tech));
  }
}

