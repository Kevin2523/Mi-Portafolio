import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { TechIconService } from '../../../core/services/tech-icon.service';

@Component({
  selector: 'app-skills-card',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="p-7 h-full flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between gap-2 mb-1">
          <p class="font-mono text-[10px] tracking-[0.2em] text-amber-500 uppercase font-semibold">{{ 'skills.badge' | t }}</p>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
            {{ activeCategory().techs.length }} Techs
          </span>
        </div>
        <h3 class="text-xl font-bold font-display text-slate-900 dark:text-white mb-4">{{ 'skills.title' | t }}</h3>

        <!-- Category Selector Tabs -->
        <div class="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 mb-5">
          @for (cat of categories; track cat.name) {
            <button 
              type="button"
              (click)="selectedCat.set(cat.name)"
              [class.bg-white]="selectedCat() === cat.name"
              [class.dark:bg-slate-800]="selectedCat() === cat.name"
              [class.text-amber-600]="selectedCat() === cat.name"
              [class.dark:text-amber-400]="selectedCat() === cat.name"
              [class.shadow-xs]="selectedCat() === cat.name"
              [class.text-slate-500]="selectedCat() !== cat.name"
              [class.dark:text-slate-400]="selectedCat() !== cat.name"
              class="px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer"
            >
              {{ cat.name }}
            </button>
          }
        </div>

        <!-- Tech Pills Grid -->
        <div class="flex flex-wrap gap-2">
          @for (tech of activeCategory().techs; track tech) {
            <span class="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:border-amber-500/40 hover:text-amber-600 dark:hover:text-amber-400 hover:scale-105 transition-all duration-200 shadow-2xs">
              <span class="w-3.5 h-3.5 flex-shrink-0" [innerHTML]="getIconSafe(tech)"></span>
              <span>{{ tech }}</span>
            </span>
          }
        </div>
      </div>

      <!-- Footer indicator -->
      <div class="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-mono">
        <span>Full-Stack & Security First</span>
        <span class="text-amber-500">OWASP / NIST</span>
      </div>
    </div>
  `
})
export class SkillsCardComponent {
  private techIconService = inject(TechIconService);
  private sanitizer = inject(DomSanitizer);

  selectedCat = signal<string>('Frontend');

  categories = [
    { name: 'Frontend', techs: ['Angular', 'TypeScript', 'Tailwind', 'HTML5', 'CSS3', 'JavaScript', 'RxJS', 'Signals'] },
    { name: 'Backend', techs: ['NestJS', 'Node.js', 'PHP', 'PostgreSQL', 'MySQL', 'Docker', 'REST API'] },
    { name: 'AI & Tools', techs: ['n8n', 'Flowise', 'Ollama', 'Google Ads', 'WordPress', 'GitHub', 'CI/CD'] },
    { name: 'Seguridad', techs: ['OWASP Top 10', 'WebAuthn', 'Trivy', 'SonarQube', 'NIST'] }
  ];

  get activeCategory() {
    return () => this.categories.find(c => c.name === this.selectedCat()) || this.categories[0];
  }

  getIconSafe(tech: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.techIconService.getIcon(tech));
  }
}

