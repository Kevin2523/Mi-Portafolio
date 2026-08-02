import { Component, ElementRef, AfterViewInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgClass],
  template: `
    <section class="py-24 px-6 w-full max-w-5xl mx-auto relative z-10" id="skills">
      <div class="mb-12">
        <h2 class="text-3xl md:text-4xl font-bold font-display">
          Habilidades
        </h2>
        <div class="h-[2px] w-24 bg-gradient-to-r from-indigo-400 via-purple-400 to-transparent dark:from-indigo-400 dark:via-purple-400 to-transparent mt-4"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        @for (group of skillGroups; track group.title; let gi = $index) {
          <div class="rounded-2xl p-5 md:p-6 bg-white dark:bg-cyber-900 border border-slate-200 dark:border-slate-800 shadow-sm shadow-indigo-200/20 dark:shadow-none transition-all duration-300 hover:shadow-md hover:shadow-indigo-200/30 dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.04)]">
            
            <!-- Header -->
            <div class="flex items-center gap-3 mb-5">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center border" [ngClass]="group.iconClass">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="group.iconPath"></path>
                </svg>
              </div>
              <h3 class="text-base font-bold font-display text-slate-800 dark:text-white">{{ group.title }}</h3>
            </div>

            <!-- Skill Bars -->
            <div class="space-y-3">
              @for (skill of group.skills; track skill.name; let si = $index) {
                <div>
                  <div class="flex justify-between items-center mb-1">
                    <span class="text-sm text-slate-600 dark:text-slate-400">{{ skill.name }}</span>
                    <span class="text-xs text-slate-400 dark:text-slate-600">{{ skill.level }}%</span>
                  </div>
                  <div class="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700/50">
                    <div 
                      class="h-full rounded-full transition-all duration-1000 ease-out skill-fill"
                      [style.width]="(visible() ? skill.level : 0) + '%'"
                      [ngClass]="group.barClass"
                    ></div>
                  </div>
                </div>
              }
            </div>

          </div>
        }
      </div>
    </section>
  `
})
export class SkillsComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly el = inject(ElementRef);
  
  visible = signal(false);

  readonly skillGroups = [
      {
        title: 'Frontend & Mobile',
        iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
        iconClass: 'bg-indigo-50 dark:bg-indigo-400/10 text-indigo-500 dark:text-indigo-400 border-indigo-200 dark:border-indigo-400/30',
        barClass: 'bg-gradient-to-r from-indigo-400 to-purple-500 dark:from-indigo-400 dark:to-purple-400',
        skills: [
          { name: 'Angular', level: 95 },
          { name: 'TypeScript', level: 92 },
          { name: 'Tailwind CSS', level: 90 },
          { name: 'React', level: 80 },
          { name: 'Kotlin (Mobile)', level: 75 },
        ]
      },
      {
        title: 'Backend & .NET',
        iconPath: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
        iconClass: 'bg-purple-50 dark:bg-purple-400/10 text-purple-500 dark:text-purple-400 border-purple-200 dark:border-purple-400/30',
        barClass: 'bg-gradient-to-r from-purple-400 to-pink-500 dark:from-purple-400 dark:to-pink-400',
        skills: [
          { name: 'C# / .NET', level: 88 },
          { name: 'Node.js', level: 82 },
          { name: 'Python', level: 80 },
          { name: 'PHP', level: 75 },
          { name: 'VB.NET', level: 70 },
          { name: 'C / C++', level: 65 },
          { name: 'Java', level: 70 },
        ]
      },
      {
        title: 'Bases de Datos',
        iconPath: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
        iconClass: 'bg-emerald-50 dark:bg-emerald-400/10 text-emerald-500 dark:text-emerald-400 border-emerald-200 dark:border-emerald-400/30',
        barClass: 'bg-gradient-to-r from-emerald-400 to-teal-500 dark:from-emerald-400 dark:to-teal-400',
        skills: [
          { name: 'SQL Server', level: 85 },
          { name: 'MySQL', level: 85 },
          { name: 'MongoDB', level: 78 },
        ]
      },
      {
        title: 'Seguridad de Software',
        iconPath: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
        iconClass: 'bg-pink-50 dark:bg-pink-400/10 text-pink-500 dark:text-pink-400 border-pink-200 dark:border-pink-400/30',
        barClass: 'bg-gradient-to-r from-pink-400 to-orange-400 dark:from-pink-400 dark:to-orange-400',
        skills: [
          { name: 'OWASP Top 10', level: 90 },
          { name: 'NIST CSF', level: 84 },
          { name: 'Trivy', level: 82 },
          { name: 'SonarQube', level: 80 },
        ]
      },
      {
        title: 'IA & Automatización',
        iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m-4 0h.01M17 19v-6a2 2 0 00-2-2H13a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2',
        iconClass: 'bg-cyan-50 dark:bg-cyan-400/10 text-cyan-500 dark:text-cyan-400 border-cyan-200 dark:border-cyan-400/30',
        barClass: 'bg-gradient-to-r from-cyan-400 to-blue-500 dark:from-cyan-400 dark:to-blue-400',
        skills: [
          { name: 'n8n', level: 85 },
          { name: 'Flowise', level: 80 },
          { name: 'Ollama', level: 78 },
          { name: 'Agentización IA', level: 82 },
        ]
      },
      {
        title: 'Data & Marketing',
        iconPath: 'M3 3v18h18M7 15l4-4 3 3 5-7',
        iconClass: 'bg-yellow-50 dark:bg-yellow-400/10 text-yellow-500 dark:text-yellow-400 border-yellow-200 dark:border-yellow-400/30',
        barClass: 'bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-yellow-400 dark:to-orange-400',
        skills: [
          { name: 'Power BI', level: 85 },
          { name: 'Google Ads', level: 90 },
          { name: 'Google Analytics 4', level: 88 },
          { name: 'Google Tag Manager', level: 85 },
          { name: 'Google Maps/Business Profile', level: 85 },
          { name: 'Looker Studio', level: 82 },
          { name: 'SEO / CRO', level: 78 },
        ]
      }
    ];

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.visible.set(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    
    const el = this.el.nativeElement.querySelector('#skills');
    if (el) {
      // Check if already in viewport on load
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        this.visible.set(true);
      } else {
        observer.observe(el);
      }
    }
  }
}
