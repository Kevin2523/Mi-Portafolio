import { Component, Input, Output, EventEmitter, inject, effect, HostListener } from '@angular/core';
import { CommonModule, NgClass, NgOptimizedImage } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Project } from '../../../core/models/project.model';
import { UiStateService } from '../../../core/services/ui-state.service';
import { TechIconService } from '../../../core/services/tech-icon.service';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule, NgClass, NgOptimizedImage],
  template: `
    @if (isOpen) {
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        [class.opacity-100]="isOpen"
        [class.opacity-0]="!isOpen"
        (click)="close()"
        aria-hidden="true"
      ></div>

      <!-- Modal -->
      <div 
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        (keydown.escape)="close()"
      >
        <div 
          #modalContainer
          class="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-white dark:bg-[#0a0a0f] border border-slate-200 dark:border-slate-800/60 shadow-2xl shadow-indigo-200/30 dark:shadow-[0_0_60px_rgba(34,211,238,0.08)] flex flex-col"
          [class.scale-100]="isOpen"
          [class.scale-95]="!isOpen"
          [class.opacity-100]="isOpen"
          [class.opacity-0]="!isOpen"
          [class.transition-all]="true"
          [class.duration-300]="true"
          (click)="$event.stopPropagation()"
        >
          <!-- Header -->
          <div class="flex items-start justify-between p-6 border-b border-slate-200 dark:border-slate-800/60 sticky top-0 bg-white/95 dark:bg-[#0a0a0f]/95 backdrop-blur z-10">
            <div>
              <p class="font-mono text-[10px] tracking-[0.2em] uppercase text-indigo-500 dark:text-indigo-400 mb-1">
                {{ project.featured ? 'Proyecto Destacado' : 'Detalle del Proyecto' }}
              </p>
              <h2 id="modal-title" class="text-2xl md:text-3xl font-bold font-display text-slate-800 dark:text-white">
                {{ project.title }}
              </h2>
            </div>
            <button
              type="button"
              (click)="close()"
              class="p-2 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900/50 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              aria-label="Cerrar modal"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
            
            <!-- Screenshots Carousel -->
            @if (project.screenshots && project.screenshots.length > 0) {
              <div class="relative">
                <div class="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800/60 bg-slate-100 dark:bg-cyber-800 aspect-video">
                  <img 
                    [ngSrc]="project.screenshots[currentScreenshot]"
                    [alt]="'Screenshot de ' + project.title + ' - Vista ' + (currentScreenshot + 1)"
                    [width]="1200"
                    [height]="675"
                    class="w-full h-full object-cover"
                    priority
                  >
                </div>
                
                @if (project.screenshots.length > 1) {
                  <!-- Prev/Next arrows -->
                  <button
                    type="button"
                    (click)="prevScreenshot()"
                    class="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all shadow-lg"
                    aria-label="Screenshot anterior"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>
                  <button
                    type="button"
                    (click)="nextScreenshot()"
                    class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all shadow-lg"
                    aria-label="Screenshot siguiente"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>

                  <!-- Dots indicator -->
                  <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    @for (s of project.screenshots; track s; let i = $index) {
                      <button
                        type="button"
                        (click)="goToScreenshot(i)"
                        [class.bg-indigo-500]="i === currentScreenshot"
                        [class.bg-slate-400]="i !== currentScreenshot"
                        class="w-2 h-2 rounded-full transition-all duration-200 hover:scale-125"
                        [attr.aria-label]="'Ver screenshot ' + (i + 1)"
                        [attr.aria-current]="i === currentScreenshot ? 'true' : 'false'"
                      ></button>
                    }
                  </div>
                }
              </div>
            }

            <!-- Description -->
            <div class="space-y-4">
              <h3 class="text-lg font-bold font-display text-slate-800 dark:text-white">Descripción</h3>
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                {{ project.longDescription }}
              </p>
            </div>

            <!-- Role -->
            <div>
              <h3 class="text-lg font-bold font-display text-slate-800 dark:text-white mb-2">Rol</h3>
              <p class="text-slate-600 dark:text-slate-400">{{ project.role }}</p>
            </div>

            <!-- Technologies -->
            <div>
              <h3 class="text-lg font-bold font-display text-slate-800 dark:text-white mb-3">Tecnologías</h3>
              <div class="flex flex-wrap gap-2">
                @for (tech of project.technologies; track tech) {
                  <span class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border"
                    [ngClass]="{
                      'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20': isFrontend(tech),
                      'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20': isBackend(tech),
                      'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-500/10 border-pink-200 dark:border-pink-500/20': isSecurity(tech),
                      'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20': isMarketing(tech),
                      'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/20': isDevOps(tech),
                      'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50': !isCategorized(tech)
                    }">
                    <span class="w-4 h-4 flex-shrink-0" [innerHTML]="getIconSafe(tech)"></span>
                    {{ tech }}
                  </span>
                }
              </div>
            </div>

            <!-- Metrics -->
            @if (project.metrics && project.metrics.length > 0) {
              <div>
                <h3 class="text-lg font-bold font-display text-slate-800 dark:text-white mb-3">Métricas Clave</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  @for (metric of project.metrics; track metric.label) {
                    <div class="p-4 rounded-xl bg-white dark:bg-cyber-900/60 border border-slate-200 dark:border-slate-800/60">
                      <span class="block text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-600 mb-1">
                        {{ metric.label }}
                      </span>
                      <span class="font-display font-bold text-xl" [ngClass]="metric.colorClass">
                        {{ metric.value }}
                      </span>
                    </div>
                  }
                </div>
              </div>
            }

            <!-- Challenges -->
            @if (project.challenges && project.challenges.length > 0) {
              <div>
                <h3 class="text-lg font-bold font-display text-slate-800 dark:text-white mb-3">Retos Resueltos</h3>
                <ul class="space-y-2">
                  @for (challenge of project.challenges; track challenge) {
                    <li class="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800/60">
                      <svg class="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-500 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      <span class="text-slate-600 dark:text-slate-400 text-sm leading-6">{{ challenge }}</span>
                    </li>
                  }
                </ul>
              </div>
            }

            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/60">
              @if (project.liveUrl && project.liveUrl !== '#') {
                <a 
                  [href]="project.liveUrl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-white font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#0a0a0f]"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                  Ver en vivo
                </a>
              } @else {
                <span class="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 text-sm cursor-not-allowed bg-slate-50 dark:bg-transparent">
                  <span class="w-2 h-2 rounded-full bg-amber-400/80 animate-pulse"></span>
                  Demo no disponible
                </span>
              }

              @if (project.repoUrl && project.repoUrl !== '#') {
                <a 
                  [href]="project.repoUrl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Ver código
                </a>
              }
            </div>

          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: contents;
    }
    @media (prefers-reduced-motion: reduce) {
      .transition-all,
      .transition-opacity,
      .animate-pulse {
        animation: none !important;
        transition: none !important;
      }
    }
  `]
})
export class ProjectModalComponent {
  @Input() project!: Project;
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();

  private uiState = inject(UiStateService);
  private techIconService = inject(TechIconService);
  private sanitizer = inject(DomSanitizer);
  currentScreenshot = 0;

  constructor() {
    effect(() => {
      if (this.isOpen) {
        this.currentScreenshot = 0;
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (!this.isOpen) return;
    
    if (event.key === 'Escape') {
      this.close();
    } else if (event.key === 'ArrowLeft' && this.project.screenshots?.length > 1) {
      this.prevScreenshot();
    } else if (event.key === 'ArrowRight' && this.project.screenshots?.length > 1) {
      this.nextScreenshot();
    }
  }

  close(): void {
    this.closed.emit();
  }

  nextScreenshot(): void {
    if (this.project.screenshots && this.project.screenshots.length > 1) {
      this.currentScreenshot = (this.currentScreenshot + 1) % this.project.screenshots.length;
    }
  }

  prevScreenshot(): void {
    if (this.project.screenshots && this.project.screenshots.length > 1) {
      this.currentScreenshot = (this.currentScreenshot - 1 + this.project.screenshots.length) % this.project.screenshots.length;
    }
  }

  goToScreenshot(index: number): void {
    this.currentScreenshot = index;
  }

  // Tech categorization helpers
  isFrontend(tech: string): boolean {
    const frontend = ['angular', 'react', 'vue', 'svelte', 'typescript', 'javascript', 'tailwind', 'css', 'html', 'sass', 'scss', 'rxjs', 'ngrx', 'signals', 'jsx', 'tsx'];
    return frontend.some(f => tech.toLowerCase().includes(f));
  }

  isBackend(tech: string): boolean {
    const backend = ['node', 'python', 'php', 'java', 'c#', '.net', 'sql', 'mysql', 'postgres', 'mongodb', 'redis', 'api', 'rest', 'graphql', 'express', 'nestjs', 'django', 'laravel', 'vb.net'];
    return backend.some(b => tech.toLowerCase().includes(b));
  }

  isSecurity(tech: string): boolean {
    const security = ['owasp', 'nist', 'trivy', 'sonarqube', 'zap', 'sast', 'dast', 'sca', 'security', 'auth', 'jwt', 'rbac', 'encryption', 'audit', 'vulnerab'];
    return security.some(s => tech.toLowerCase().includes(s));
  }

  isMarketing(tech: string): boolean {
    const marketing = ['ads', 'analytics', 'seo', 'maps', 'tag manager', 'looker', 'copywriting', 'cro', 'conversion', 'keyword', 'campaign'];
    return marketing.some(m => tech.toLowerCase().includes(m));
  }

  isDevOps(tech: string): boolean {
    const devops = ['docker', 'kubernetes', 'ci/cd', 'github', 'gitlab', 'jenkins', 'terraform', 'aws', 'azure', 'gcp', 'cdn', 'ssg', 'prerender', 'jamstack', 'vercel', 'netlify'];
    return devops.some(d => tech.toLowerCase().includes(d));
  }

  isCategorized(tech: string): boolean {
    return this.isFrontend(tech) || this.isBackend(tech) || this.isSecurity(tech) || this.isMarketing(tech) || this.isDevOps(tech);
  }

  getIconSafe(tech: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.techIconService.getIcon(tech));
  }
}