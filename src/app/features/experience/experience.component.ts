import { AfterViewInit, Component, ElementRef, OnDestroy, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { ScrollRevealDirective } from '../../core/services/scroll-animation.service';

interface ExperienceEntry {
  id: string; period: string; company: string; role: string;
  description: string; highlights: string[];
  accentColor: 'cyan' | 'emerald' | 'purple';
  isActive: boolean;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [NgClass, ScrollRevealDirective, TranslatePipe],
  template: `
    <section id="experience" class="relative w-full py-32 px-6 overflow-hidden" appScrollReveal="fade-up" [delay]="100">
      <div class="relative z-10 max-w-4xl mx-auto">
       
        <header class="mb-24" appScrollReveal="fade-up" [delay]="200">
          <p class="font-mono text-[11px] tracking-[0.3em] text-indigo-500 dark:text-indigo-400 uppercase mb-3">{{ 'experience.badge' | t }}</p>
          <h2 class="text-4xl md:text-5xl font-bold font-display tracking-tight leading-none mb-6">
            {{ 'experience.title' | t }}
          </h2>
          <div class="h-[2px] w-24 bg-gradient-to-r from-indigo-400 via-purple-400 to-transparent dark:from-indigo-400 dark:via-purple-400 to-transparent mb-4"></div>
          <p class="text-slate-500 dark:text-slate-500 text-sm max-w-lg leading-relaxed">
            {{ 'experience.subtitle' | t }}
          </p>
        </header>

        <div class="relative">
                  <!-- Stem - centered on all screen sizes, BEHIND cards -->
                  <div class="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-300 via-purple-300 to-transparent dark:from-indigo-400 dark:via-purple-400 to-transparent -z-10"></div>

                  @for (entry of entries; track entry.id; let i = $index) {
                    <div class="timeline-entry mb-16 last:mb-0" [class.visible]="visibleEntries().has(entry.id)"
                         [style.transitionDelay]="'0ms'" [attr.data-entry-id]="entry.id"
                         appScrollReveal="fade-up" [delay]="(i + 1) * 150 + 300">
                      <div class="relative flex flex-col md:flex-row gap-6 md:gap-8" [class.md:flex-row-reverse]="i % 2 !== 0">
              
                        <!-- Node desktop -->
                        <div class="absolute left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center justify-center w-12">
                          <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-white dark:bg-cyber-900 border-2 transition-all duration-500 shadow-sm dark:shadow-lg mx-auto"
                            [ngClass]="{
                              'border-emerald-400 dark:border-emerald-400/60 shadow-emerald-200/50 dark:shadow-emerald-400/20': entry.accentColor === 'emerald' && entry.isActive,
                              'border-indigo-300 dark:border-indigo-400/40 shadow-indigo-200/30 dark:shadow-indigo-400/10': entry.accentColor === 'cyan',
                              'border-purple-300 dark:border-purple-400/40 shadow-purple-200/30 dark:shadow-purple-400/10': entry.accentColor === 'purple'
                            }">
                            <span class="font-display font-bold text-sm"
                              [ngClass]="{
                                'text-emerald-500 dark:text-emerald-400': entry.accentColor === 'emerald',
                                'text-indigo-500 dark:text-indigo-400': entry.accentColor === 'cyan',
                                'text-purple-500 dark:text-purple-400': entry.accentColor === 'purple'
                              }">★</span>
                          </div>
                        </div>

                        <!-- Mobile dot -->
                        <div class="md:hidden absolute left-1/2 -translate-x-1/2 top-2 w-4 h-4 rounded-full border-2 bg-white dark:bg-cyber-900 z-10"
                          [ngClass]="{
                            'border-emerald-400 dark:border-emerald-400': entry.accentColor === 'emerald',
                            'border-indigo-300 dark:border-indigo-400': entry.accentColor === 'cyan',
                            'border-purple-300 dark:border-purple-400': entry.accentColor === 'purple'
                          }"></div>

                        <!-- Card - full width on mobile, 50% on desktop -->
                                        <div class="w-full md:w-1/2 px-4 md:px-8 relative z-10" [class.md:pl-0]="i % 2 === 0" [class.md:pr-0]="i % 2 !== 0">
                                          <div class="rounded-2xl p-5 md:p-6 bg-white dark:bg-cyber-900 border border-slate-200 dark:border-slate-800 shadow-sm shadow-indigo-200/20 dark:shadow-none transition-all duration-300 hover:shadow-md hover:shadow-indigo-200/30 dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.04)] h-full z-10">
                  
                    <div class="flex items-center gap-3 mb-4">
                      <span class="font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-lg border whitespace-nowrap"
                        [ngClass]="{
                          'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/5 border-emerald-200 dark:border-emerald-400/30': entry.accentColor === 'emerald',
                          'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-400/5 border-indigo-200 dark:border-indigo-400/30': entry.accentColor === 'cyan',
                          'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-400/5 border-purple-200 dark:border-purple-400/30': entry.accentColor === 'purple'
                        }">
                        {{ entry.period }}
                      </span>
                      @if (entry.isActive) {
                        <span class="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-400/5 border border-emerald-200 dark:border-emerald-400/30 text-[10px] text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                          <span class="w-1.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse"></span>
                          Actual
                        </span>
                      }
                    </div>

                    <h3 class="text-lg md:text-xl font-bold text-slate-800 dark:text-white leading-tight mb-1 font-display">{{ entry.role | t }}</h3>
                    <p class="text-slate-500 dark:text-slate-500 text-sm mb-4">{{ entry.company | t }}</p>

                    <p class="text-slate-600 dark:text-slate-400 text-sm leading-7 font-light mb-4">{{ entry.description | t }}</p>

                    <div class="flex flex-wrap gap-2">
                      @for (h of entry.highlights; track h) {
                        <span class="font-mono text-[10px] px-2.5 py-1 rounded-lg border"
                          [ngClass]="{
                            'text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-400/30 bg-emerald-50 dark:bg-emerald-400/5': entry.accentColor === 'emerald',
                            'text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-400/30 bg-indigo-50 dark:bg-indigo-400/5': entry.accentColor === 'cyan',
                            'text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-400/30 bg-purple-50 dark:bg-purple-400/5': entry.accentColor === 'purple'
                          }">
                          {{ h | t }}
                        </span>
                      }
                    </div>

                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class ExperienceComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly el = inject(ElementRef);
  private observer?: IntersectionObserver;

  readonly entries: ExperienceEntry[] = [
    {
      id: 'rosero-one', period: '2026',
      company: 'exp.rosero.company', role: 'exp.rosero.role',
      description: 'exp.rosero.desc',
      highlights: ['exp.rosero.h1', 'exp.rosero.h2', 'exp.rosero.h3', 'exp.rosero.h4'],
      accentColor: 'emerald', isActive: false,
    },
    {
      id: 'jornada-industrial-cocle', period: '2026',
      company: 'exp.jornada.company', role: 'exp.jornada.role',
      description: 'exp.jornada.desc',
      highlights: ['exp.jornada.h1', 'exp.jornada.h2', 'exp.jornada.h3', 'exp.jornada.h4', 'exp.jornada.h5'],
      accentColor: 'cyan', isActive: false,
    },
    {
      id: 'web-clientes', period: '2026',
      company: 'exp.web.company', role: 'exp.web.role',
      description: 'exp.web.desc',
      highlights: ['exp.web.h1', 'exp.web.h2', 'exp.web.h3', 'exp.web.h4', 'exp.web.h5'],
      accentColor: 'purple', isActive: true,
    }
  ];

  readonly visibleEntries = signal<Set<string>>(new Set());
  readonly allVisible = computed(() => this.visibleEntries().size === this.entries.length);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset['entryId'];
            if (id) { this.visibleEntries.update(set => new Set([...set, id])); this.observer?.unobserve(entry.target); }
          }
        });
      }, { threshold: 0.15 }
    );
    const cards = this.el.nativeElement.querySelectorAll('[data-entry-id]');
    cards.forEach((card: Element) => this.observer?.observe(card));
  }

  ngOnDestroy(): void { this.observer?.disconnect(); }
}