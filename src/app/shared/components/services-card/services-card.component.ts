import { Component, inject, signal } from '@angular/core';
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
        <h3 class="text-xl font-bold font-display text-slate-900 dark:text-white mb-1">{{ 'services.title' | t }}</h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">{{ 'services.subtitle' | t }}</p>

        <div class="space-y-1.5">
          @for (service of services; track service.title) {
            <div>
              <button
                type="button"
                (click)="toggle(service.title)"
                class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 hover:border-amber-500/40 hover:bg-amber-500/[0.04] transition-all duration-200 group cursor-pointer text-left"
              >
                <div class="flex items-center gap-3">
                  <span class="w-4 h-4 text-amber-500 flex-shrink-0" [innerHTML]="getIconSafe(service.icon)"></span>
                  <span class="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{{ service.title | t }}</span>
                </div>
                <svg class="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-amber-500 transition-all duration-200" [class.rotate-90]="isOpen(service.title)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
              @if (isOpen(service.title)) {
                <div class="px-3.5 pt-2 pb-1 pl-10 text-xs text-slate-500 dark:text-slate-400 leading-relaxed animate-fade-in">
                  {{ service.desc | t }}
                </div>
              }
            </div>
          }
        </div>
      </div>

      <div class="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-400 dark:text-slate-500">
        Soluciones digitales completas, desde la idea hasta la implementación.
      </div>
    </div>
  `
})
export class ServicesCardComponent {
  private techIconService = inject(TechIconService);
  private sanitizer = inject(DomSanitizer);
  openService = signal<string | null>(null);

  services = [
    { title: 'srv.core.software.title', desc: 'srv.core.software.desc', icon: 'Software' },
    { title: 'srv.core.web.title', desc: 'srv.core.web.desc', icon: 'Angular' },
    { title: 'srv.core.ai.title', desc: 'srv.core.ai.desc', icon: 'n8n' },
    { title: 'srv.core.ads.title', desc: 'srv.core.ads.desc', icon: 'Google Ads' },
    { title: 'srv.core.security.title', desc: 'srv.core.security.desc', icon: 'Seguridad' }
  ];

  toggle(title: string): void {
    this.openService.set(this.openService() === title ? null : title);
  }

  isOpen(title: string): boolean {
    return this.openService() === title;
  }

  getIconSafe(tech: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.techIconService.getIcon(tech));
  }
}
