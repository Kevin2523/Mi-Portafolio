import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-photo-card',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="flex flex-col items-center justify-between h-full p-7 text-center relative overflow-hidden">
      <!-- Ambient aura background -->
      <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>

      <!-- Top info & Photo -->
      <div class="flex flex-col items-center relative z-10">
        <!-- Photo Container with Double Border / Glow -->
        <div class="relative mb-4 group">
          <div class="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 opacity-40 blur-sm group-hover:opacity-75 transition duration-500"></div>
          <img src="/profile.png" alt="Kevin Mena"
               class="relative w-24 h-24 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-md">
          <span class="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-sm" title="Online"></span>
        </div>

        <!-- Name & Role -->
        <h3 class="font-display font-bold text-xl text-slate-900 dark:text-white tracking-tight mb-1">
          {{ 'hero.name' | t }}
        </h3>
        <p class="text-xs font-mono text-amber-600 dark:text-amber-400 font-medium mb-3">
          {{ 'hero.title' | t }}
        </p>

        <!-- Location Badge -->
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-xs text-slate-500 dark:text-slate-400 mb-5">
          <svg class="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span>San Carlos, Panamá</span>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-2 gap-3 w-full pt-4 border-t border-slate-100 dark:border-slate-800/80 relative z-10">
        <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60">
          <p class="text-2xl font-bold font-display text-amber-500 dark:text-amber-400">4+</p>
          <p class="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">{{ 'about.stats.projectsLabel' | t }}</p>
        </div>
        <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60">
          <p class="text-2xl font-bold font-display text-slate-800 dark:text-white">12+</p>
          <p class="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">{{ 'about.stats.techLabel' | t }}</p>
        </div>
      </div>
    </div>
  `
})
export class PhotoCardComponent {}

