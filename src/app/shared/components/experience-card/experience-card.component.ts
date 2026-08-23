import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="p-7 h-full flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-1">
          <p class="font-mono text-[10px] tracking-[0.2em] text-amber-500 uppercase font-semibold">{{ 'experience.badge' | t }}</p>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">Activo</span>
        </div>
        <h3 class="text-xl font-bold font-display text-slate-900 dark:text-white mb-5">{{ 'experience.title' | t }}</h3>

        <div class="space-y-4">
          @for (entry of entries; track entry.title) {
            <div class="flex gap-3.5 group">
              <!-- Timeline node -->
              <div class="flex flex-col items-center">
                <div class="w-3 h-3 rounded-full border-2 border-amber-500 bg-white dark:bg-slate-900 mt-1 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                @if (!$last) {
                  <div class="w-px flex-1 bg-slate-200 dark:border-slate-800/80 dark:bg-slate-800 mt-1.5"></div>
                }
              </div>

              <!-- Content -->
              <div class="pb-3 flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold">{{ entry.year }}</span>
                  <h4 class="text-sm font-semibold text-slate-900 dark:text-white">{{ entry.title | t }}</h4>
                </div>
                <p class="text-xs text-slate-400 dark:text-slate-500 italic mb-1.5">{{ entry.company | t }}</p>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 mb-2">{{ entry.desc | t }}</p>
                <div class="flex flex-wrap gap-1">
                  @for (tag of entry.tags; track tag) {
                    <span class="text-[10px] px-2 py-0.5 rounded-md border border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">{{ tag | t }}</span>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class ExperienceCardComponent {
  entries = [
    {
      year: '2026',
      title: 'exp.rosero.role',
      company: 'exp.rosero.company',
      desc: 'exp.rosero.desc',
      tags: ['exp.rosero.h1', 'exp.rosero.h2', 'exp.rosero.h3']
    },
    {
      year: '2026',
      title: 'exp.jornada.role',
      company: 'exp.jornada.company',
      desc: 'exp.jornada.desc',
      tags: ['exp.jornada.h1', 'exp.jornada.h2', 'exp.jornada.h3']
    },
    {
      year: '2026 – Actual',
      title: 'exp.web.role',
      company: 'exp.web.company',
      desc: 'exp.web.desc',
      tags: ['exp.web.h1', 'exp.web.h2', 'exp.web.h3']
    }
  ];
}

