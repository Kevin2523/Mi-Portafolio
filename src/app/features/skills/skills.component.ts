import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../core/services/scroll-animation.service';

interface TechItem {
  name: string;
  letter: string;
  color: string;
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
                  <div class="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover/tech:scale-110 group-hover/tech:shadow-lg"
                       [style.background]="tech.color + '18'"
                       [style.border]="'2px solid ' + tech.color + '40'"
                       [style.color]="tech.color">
                    <span class="text-lg font-bold font-display">{{ tech.letter }}</span>
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
  readonly categories: TechCategory[] = [
    {
      title: 'Frontend',
      gradient: 'from-blue-500 to-cyan-400',
      items: [
        { name: 'HTML5', letter: 'H5', color: '#E44D26' },
        { name: 'CSS3', letter: 'C3', color: '#1572B6' },
        { name: 'JavaScript', letter: 'JS', color: '#F7DF1E' },
        { name: 'Angular', letter: 'A', color: '#DD0031' },
        { name: 'TypeScript', letter: 'TS', color: '#3178C6' },
        { name: 'Tailwind', letter: 'Tw', color: '#06B6D4' }
      ]
    },
    {
      title: 'Backend',
      gradient: 'from-emerald-500 to-teal-400',
      items: [
        { name: 'NestJS', letter: 'N', color: '#E0234E' },
        { name: 'Node.js', letter: 'NJ', color: '#339933' },
        { name: 'PHP', letter: 'P', color: '#777BB4' },
        { name: 'MySQL', letter: 'My', color: '#4479A1' },
        { name: 'PostgreSQL', letter: 'Pg', color: '#4169E1' },
        { name: 'Docker', letter: 'D', color: '#2496ED' }
      ]
    },
    {
      title: 'Herramientas',
      gradient: 'from-purple-500 to-pink-400',
      items: [
        { name: 'Git', letter: 'G', color: '#F05032' },
        { name: 'GitHub', letter: 'GH', color: '#181717' },
        { name: 'VS Code', letter: 'VS', color: '#007ACC' },
        { name: 'n8n', letter: 'n8', color: '#EA4B71' },
        { name: 'Google Ads', letter: 'GA', color: '#4285F4' },
        { name: 'WordPress', letter: 'W', color: '#21759B' }
      ]
    },
    {
      title: 'Seguridad',
      gradient: 'from-red-500 to-orange-400',
      items: [
        { name: 'OWASP', letter: 'OW', color: '#FF6633' },
        { name: 'NIST', letter: 'NIST', color: '#003366' },
        { name: 'Trivy', letter: 'T', color: '#439D46' },
        { name: 'SonarQube', letter: 'SQ', color: '#E48E3B' }
      ]
    },
    {
      title: 'Automatización & IA',
      gradient: 'from-cyan-500 to-blue-400',
      items: [
        { name: 'n8n', letter: 'n8', color: '#EA4B71' },
        { name: 'Flowise', letter: 'F', color: '#2563EB' }
      ]
    },
    {
      title: 'Mobile',
      gradient: 'from-orange-500 to-yellow-400',
      items: [
        { name: 'Kotlin', letter: 'K', color: '#7F52FF' }
      ]
    }
  ];
}
