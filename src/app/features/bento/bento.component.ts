import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { SkillsCardComponent } from '../../shared/components/skills-card/skills-card.component';
import { ExperienceCardComponent } from '../../shared/components/experience-card/experience-card.component';
import { ServicesCardComponent } from '../../shared/components/services-card/services-card.component';
import { ContactCardComponent } from '../../shared/components/contact-card/contact-card.component';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { KEVIN_PROJECTS } from '../../core/models/project.model';

@Component({
  selector: 'app-bento',
  standalone: true,
  imports: [
    CommonModule, HeroComponent, ProjectCardComponent,
    SkillsCardComponent, ExperienceCardComponent, ServicesCardComponent,
    ContactCardComponent, TranslatePipe
  ],
  template: `
    <section class="w-full max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16">
      
      <!-- Bento Grid 2.0 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 auto-rows-auto">

        <!-- Unified Hero Banner (Full width: 3 cols) -->
        <div id="about" class="bento-glow-card md:col-span-2 lg:col-span-3 scroll-mt-24">
          <app-hero></app-hero>
        </div>

        <!-- Projects Section Header -->
        <div id="projects" class="md:col-span-2 lg:col-span-3 scroll-mt-24">
          <p class="font-mono text-[10px] tracking-[0.2em] text-amber-500 uppercase font-semibold mb-1">PORTAFOLIO</p>
          <h2 class="text-2xl md:text-3xl font-bold font-display text-slate-900 dark:text-white mb-1">Proyectos Destacados</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-5">Lo que he construido para negocios reales.</p>
        </div>

        <!-- Project 1: Anibal (featured, 2 cols) -->
        <div class="bento-glow-card md:col-span-2">
          <app-project-card [project]="projects[0]" class="block h-full"></app-project-card>
        </div>

        <!-- Project 2: Jornada -->
        <div class="bento-glow-card">
          <app-project-card [project]="projects[1]" class="block h-full"></app-project-card>
        </div>

        <!-- Project 3: Casa Jean -->
        <div class="bento-glow-card">
          <app-project-card [project]="projects[2]" class="block h-full"></app-project-card>
        </div>

        <!-- Project 4: NextAudit (featured, 2 cols) -->
        <div class="bento-glow-card md:col-span-2">
          <app-project-card [project]="projects[3]" class="block h-full"></app-project-card>
        </div>

        <!-- Services -->
        <div id="services" class="bento-glow-card md:col-span-2 scroll-mt-24">
          <app-services-card></app-services-card>
        </div>

        <!-- Process -->
        <div id="process" class="bento-glow-card lg:col-span-3 scroll-mt-24 p-6 md:p-8">
          <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-6">
            <div>
              <p class="font-mono text-[10px] tracking-[0.2em] text-amber-500 uppercase font-semibold mb-1">{{ 'process.badge' | t }}</p>
              <h2 class="text-2xl md:text-3xl font-bold font-display text-slate-900 dark:text-white">{{ 'process.title' | t }}</h2>
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400 max-w-md">{{ 'process.subtitle' | t }}</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            @for (step of processSteps; track step.number) {
              <div class="relative p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/70 bg-slate-50/60 dark:bg-slate-900/30">
                <span class="text-xs font-mono text-amber-500">{{ step.number }}</span>
                <h3 class="mt-3 text-sm font-semibold text-slate-800 dark:text-white">{{ step.title | t }}</h3>
                <p class="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{{ step.desc | t }}</p>
              </div>
            }
          </div>
        </div>

        <!-- Experience (2 cols) -->
        <div id="experience" class="bento-glow-card md:col-span-2 scroll-mt-24">
          <app-experience-card></app-experience-card>
        </div>

        <!-- Skills Card -->
        <div id="skills" class="bento-glow-card scroll-mt-24">
          <app-skills-card></app-skills-card>
        </div>

        <!-- Contact (Full width at bottom: 3 cols) -->
        <div class="bento-glow-card md:col-span-2 lg:col-span-3 scroll-mt-24">
          <app-contact-card></app-contact-card>
        </div>

      </div>
    </section>
  `
})
export class BentoComponent {
  projects = KEVIN_PROJECTS;

  processSteps = [
    { number: '01', title: 'process.1.title', desc: 'process.1.desc' },
    { number: '02', title: 'process.2.title', desc: 'process.2.desc' },
    { number: '03', title: 'process.3.title', desc: 'process.3.desc' },
    { number: '04', title: 'process.4.title', desc: 'process.4.desc' }
  ];
}


