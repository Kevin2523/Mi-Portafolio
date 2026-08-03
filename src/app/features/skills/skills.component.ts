import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../core/services/scroll-animation.service';
import { TechIconService } from '../../core/services/tech-icon.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface TechItem {
  name: string;
  iconKey: string;
}

interface TechCategory {
  title: string;
  gradient: string;
  items: TechItem[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section class="py-24 px-6 w-full max-w-6xl mx-auto relative z-10" id="skills">
      <div class="mb-16" appScrollReveal="fade-up" [delay]="100">
        <p class="font-mono text-[11px] tracking-[0.3em] text-indigo-500 dark:text-indigo-400 uppercase mb-3">Stack</p>
        <h2 class="text-3xl md:text-4xl font-bold font-display text-slate-800 dark:text-white">
          Tecnologías
        </h2>
        <div class="h-[2px] w-24 bg-gradient-to-r from-indigo-400 via-purple-400 to-transparent mt-4"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (category of categories; track category.title; let i = $index) {
          <div class="group rounded-2xl p-6 bg-white dark:bg-cyber-900/60 border border-slate-200 dark:border-slate-800/60 shadow-sm hover:shadow-lg transition-all duration-300"
               appScrollReveal="fade-up" [delay]="(i + 1) * 100">
            
            <!-- Category Header -->
            <h3 class="text-lg font-bold font-display mb-5 bg-gradient-to-r bg-clip-text text-transparent {{ category.gradient }}">
              {{ category.title }}
            </h3>

            <!-- Tech Grid -->
            <div class="grid grid-cols-3 gap-4">
              @for (tech of category.items; track tech.name) {
                <div class="flex flex-col items-center gap-2 group/tech">
                  <div class="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover/tech:scale-110 group-hover/tech:shadow-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                    <span class="w-8 h-8" [innerHTML]="getIcon(tech.iconKey)"></span>
                  </div>
                  <span class="text-[11px] text-slate-500 dark:text-slate-400 text-center leading-tight">{{ tech.name }}</span>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </section>
  `
})
export class SkillsComponent {
  private techIconService = inject(TechIconService);
  private sanitizer = inject(DomSanitizer);

  getIcon(key: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.techIconService.getIcon(key));
  }

  readonly categories: TechCategory[] = [
    {
      title: 'Frontend',
      gradient: 'from-blue-500 to-cyan-400',
      items: [
        { name: 'HTML5', iconKey: 'HTML' },
        { name: 'CSS3', iconKey: 'CSS' },
        { name: 'JavaScript', iconKey: 'JavaScript' },
        { name: 'Angular', iconKey: 'Angular' },
        { name: 'TypeScript', iconKey: 'TypeScript' },
        { name: 'Tailwind', iconKey: 'Tailwind CSS' }
      ]
    },
    {
      title: 'Backend',
      gradient: 'from-emerald-500 to-teal-400',
      items: [
        { name: 'NestJS', iconKey: 'NestJS' },
        { name: 'Node.js', iconKey: 'Node.js' },
        { name: 'PHP', iconKey: 'PHP' },
        { name: 'MySQL', iconKey: 'MySQL' },
        { name: 'PostgreSQL', iconKey: 'PostgreSQL' },
        { name: 'Docker', iconKey: 'Docker' }
      ]
    },
    {
      title: 'Herramientas',
      gradient: 'from-purple-500 to-pink-400',
      items: [
        { name: 'Git', iconKey: 'Git' },
        { name: 'GitHub', iconKey: 'GitHub' },
        { name: 'VS Code', iconKey: 'VSCode' },
        { name: 'n8n', iconKey: 'n8n' },
        { name: 'Google Ads', iconKey: 'Google Ads' },
        { name: 'WordPress', iconKey: 'WordPress' }
      ]
    },
    {
      title: 'Seguridad',
      gradient: 'from-red-500 to-orange-400',
      items: [
        { name: 'OWASP', iconKey: 'OWASP' },
        { name: 'NIST', iconKey: 'NIST' },
        { name: 'Trivy', iconKey: 'Trivy' },
        { name: 'SonarQube', iconKey: 'SonarQube' }
      ]
    },
    {
      title: 'Automatización & IA',
      gradient: 'from-cyan-500 to-blue-400',
      items: [
        { name: 'n8n', iconKey: 'n8n' },
        { name: 'Flowise', iconKey: 'Flowise' }
      ]
    },
    {
      title: 'Mobile',
      gradient: 'from-orange-500 to-yellow-400',
      items: [
        { name: 'Kotlin', iconKey: 'Kotlin' }
      ]
    }
  ];
}
