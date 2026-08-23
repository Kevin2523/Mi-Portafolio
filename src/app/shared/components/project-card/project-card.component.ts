import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { Project } from '../../../core/models/project.model';
import { UiStateService } from '../../../core/services/ui-state.service';
import { TechIconService } from '../../../core/services/tech-icon.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div 
      (click)="openModal()"
      (keydown.enter)="openModal()"
      (keydown.space)="openModal()"
      class="group relative flex flex-col h-full w-full rounded-2xl overflow-hidden cursor-pointer select-none transition-all duration-300"
      (mousemove)="updateSpotlight($event)"
      (mouseleave)="isHovered = false"
      tabindex="0"
      [attr.aria-label]="'Ver detalle de ' + (project.title | t)"
    >
      <!-- Spotlight Ambient Layer -->
      <div 
        class="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-10"
        [style.opacity]="isHovered ? '1' : '0'"
        [style.background]="spotlightGradient"
      ></div>

      <div class="relative z-20 flex flex-col flex-grow">
       
        <!-- Screenshot Preview Area with Glass Reflection -->
        @if (project.screenshots && project.screenshots.length > 0) {
          <div class="relative h-44 md:h-52 overflow-hidden bg-slate-100 dark:bg-slate-900/80 border-b border-slate-100 dark:border-slate-800/80">
            <!-- Main image -->
            <img [src]="project.screenshots[0]" [alt]="project.title"
                 class="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                 loading="lazy">
            
            <!-- Gradient overlays -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            
            <!-- Quick View floating pill on image -->
            <div class="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-mono opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm">
              <span>{{ 'proj.btn.modal' | t }}</span>
              <svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </div>

            <!-- Featured Badge if applicable -->
            @if (project.featured) {
              <div class="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500 text-white text-[10px] font-mono font-semibold uppercase tracking-wider shadow-sm">
                <span>★ Destacado</span>
              </div>
            }
          </div>
        }

        <!-- Card Content Area -->
        <div class="flex flex-col flex-grow p-6 md:p-7">
         
          <!-- Title row -->
          <div class="flex items-start justify-between gap-3 mb-2">
            <h3 class="text-xl md:text-2xl font-bold tracking-tight font-display text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-200">
              {{ project.title | t }}
            </h3>
            
            <div class="w-8 h-8 rounded-lg border border-slate-200/80 dark:border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-amber-500 group-hover:border-amber-500/40 transition-colors flex-shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </div>
          </div>

          <!-- Description -->
          <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-400 mb-6 font-normal">
            {{ project.shortDescription | t }}
          </p>

          <div class="flex-grow"></div>

          <!-- Technologies row -->
          <div class="pt-4 border-t border-slate-100 dark:border-slate-800/70">
            <div class="flex flex-wrap gap-1.5">
              @for (tech of project.technologies.slice(0, 5); track tech) {
                <span class="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400">
                  <span class="w-3.5 h-3.5 flex-shrink-0" [innerHTML]="getIconSafe(tech)"></span>
                  {{ tech }}
                </span>
              }
              @if (project.technologies.length > 5) {
                <span class="inline-flex items-center text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono">
                  +{{ project.technologies.length - 5 }}
                </span>
              }
            </div>
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
    const lightColor = 'rgba(245, 158, 11, 0.08)';  // amber glow for light
    const darkColor = 'rgba(245, 158, 11, 0.06)';   // amber glow for dark
    return `radial-gradient(450px circle at ${this.mouseX}px ${this.mouseY}px, ${lightColor}, transparent 45%)`;
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