import { Component, Input, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { Project } from '../../../core/models/project.model';
import { UiStateService } from '../../../core/services/ui-state.service';
import { TechIconService } from '../../../core/services/tech-icon.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <div 
      class="group relative flex flex-col h-full w-full rounded-2xl overflow-hidden bg-white dark:bg-cyber-900/60 border border-slate-200 dark:border-slate-800/60 shadow-lg shadow-slate-200/50 dark:shadow-none transition-all duration-500 hover:shadow-xl hover:shadow-indigo-200/50 dark:hover:shadow-[0_0_40px_rgba(34,211,238,0.06)] hover:-translate-y-1 cursor-pointer"
      (mousemove)="updateSpotlight($event)"
      (mouseleave)="isHovered = false"
      (click)="openModal()"
      (keydown.enter)="openModal()"
      (keydown.space)="openModal()"
      tabindex="0"
      role="button"
      [attr.aria-label]="'Ver detalle de ' + project.title"
    >
      <!-- Light-mode spotlight (indigo) / Dark-mode spotlight (cyan) -->
      <div 
        class="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-0"
        [style.opacity]="isHovered ? '1' : '0'"
        [style.background]="spotlightGradient"
      ></div>

      <div class="relative z-10 flex flex-col flex-grow">
       
        <!-- Screenshot area with device frame -->
        @if (project.screenshots && project.screenshots.length > 0) {
          <div class="relative h-44 md:h-48 overflow-hidden bg-slate-100 dark:bg-cyber-800">
            <!-- Main image -->
            <img [src]="project.screenshots[0]" [alt]="project.title"
                 class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                 loading="lazy">
            <!-- Glass reflection overlay -->
            <div class="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 dark:from-white/5 dark:via-transparent dark:to-black/20 pointer-events-none"></div>
            <!-- Bottom fade -->
            <div class="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-cyber-900/80 via-transparent to-transparent"></div>
            <!-- Subtle top light line -->
            <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-300/30 dark:via-white/10 to-transparent"></div>
          </div>
        }

        <!-- Content -->
        <div class="flex flex-col flex-grow p-6">
         
          <!-- Title & Icon row -->
          <div class="flex items-start justify-between gap-3 mb-3">
            <h3 class="text-xl md:text-2xl font-bold tracking-tight font-display text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
              {{ project.title | t }}
            </h3>
          </div>

          <!-- Description -->
          <p class="text-sm leading-7 text-slate-600 dark:text-slate-400 mb-4">
            {{ project.shortDescription | t }}
          </p>

          <div class="flex-grow"></div>

          <!-- Footer -->
          <div class="pt-4 border-t border-slate-100 dark:border-slate-800/70">
            <p class="text-[10px] font-medium text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-3">
              {{ 'skills.title' | t }}
            </p>

            <div class="flex flex-wrap gap-2 mb-4">
              @for (tech of project.technologies; track tech) {
                <span class="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 group-hover:border-indigo-300 dark:group-hover:border-indigo-400/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all duration-300">
                  <span class="w-3.5 h-3.5 flex-shrink-0" [innerHTML]="getIconSafe(tech)"></span>
                  {{ tech }}
                </span>
              }
            </div>

            @if (project.liveUrl && project.liveUrl !== '#') {
              <span class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-400 dark:to-purple-400 text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:-translate-y-0.5">
                <span>{{ 'proj.btn.live' | t }}</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </span>
            } @else {
              <span class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 text-sm cursor-not-allowed bg-slate-50 dark:bg-transparent">
                <span class="w-2 h-2 rounded-full bg-amber-400/80 animate-pulse"></span>
                {{ 'proj.btn.dev' | t }}
              </span>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;

  mouseX = 0;
  mouseY = 0;
  isHovered = false;

  private uiState = inject(UiStateService);
  private techIconService = inject(TechIconService);
  private sanitizer = inject(DomSanitizer);

  get spotlightGradient(): string {
    const lightColor = 'rgba(99,102,241,0.04)';  // indigo for light
    const darkColor = 'rgba(34,211,238,0.05)';   // cyan for dark
    return `radial-gradient(500px circle at ${this.mouseX}px ${this.mouseY}px, ${lightColor}, transparent 40%)`;
  }

  updateSpotlight(event: MouseEvent): void {
    this.isHovered = true;
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
  }

  openModal(): void {
    this.uiState.openModal(this.project);
  }

  getIconSafe(tech: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.techIconService.getIcon(tech));
  }
}