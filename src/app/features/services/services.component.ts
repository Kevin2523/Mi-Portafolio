import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { ScrollRevealDirective } from '../../core/services/scroll-animation.service';
import { TechIconService } from '../../core/services/tech-icon.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NgClass, ScrollRevealDirective],
  template: `
    <section id="services" class="py-24 px-6 w-full max-w-6xl mx-auto relative z-10">
      <div class="mb-16" appScrollReveal="fade-up" [delay]="100">
        <p class="font-mono text-[11px] tracking-[0.3em] text-indigo-500 dark:text-indigo-400 uppercase mb-3">Lo que hago</p>
        <h2 class="text-3xl md:text-4xl font-bold font-display text-slate-800 dark:text-white">
          Servicios
        </h2>
        <div class="h-[2px] w-24 bg-gradient-to-r from-indigo-400 via-purple-400 to-transparent mt-4"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (service of services; track service.title; let i = $index) {
          <div class="group relative rounded-2xl p-6 bg-white dark:bg-cyber-900/60 border border-slate-200 dark:border-slate-800/60 shadow-sm hover:shadow-lg hover:shadow-indigo-200/20 dark:hover:shadow-none transition-all duration-300 hover:-translate-y-1"
               appScrollReveal="fade-up" [delay]="(i + 1) * 100">
            
            <!-- Icon -->
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border"
              [ngClass]="service.iconClass">
              <span class="w-6 h-6" [innerHTML]="service.icon"></span>
            </div>

            <!-- Title -->
            <h3 class="text-lg font-bold font-display text-slate-800 dark:text-white mb-2">
              {{ service.title }}
            </h3>

            <!-- Description -->
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              {{ service.description }}
            </p>

            <!-- What includes -->
            <div class="mb-4">
              <p class="text-[10px] font-mono text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-2">Qué incluye</p>
              <div class="flex flex-wrap gap-1.5">
                @for (item of service.includes; track item) {
                  <span class="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400">
                    <span class="w-3 h-3 flex-shrink-0" [innerHTML]="getIconSafe(item)"></span>
                    {{ item }}
                  </span>
                }
              </div>
            </div>

            <!-- Result -->
            <div class="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/70">
              <svg class="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="text-[11px] text-slate-500 dark:text-slate-400">{{ service.result }}</span>
            </div>
          </div>
        }
      </div>
    </section>
  `
})
export class ServicesComponent {
  private techIconService = inject(TechIconService);
  private sanitizer = inject(DomSanitizer);

  services = [
    {
      title: 'Desarrollo Web',
      description: 'Sitios web completos, landing pages y e-commerce que convierten. Desde una página institucional hasta una tienda online con panel de administración.',
      includes: ['Angular', 'WordPress', 'PHP', 'MySQL', 'Tailwind CSS'],
      icon: this.getIconSafe('Angular'),
      iconClass: 'bg-emerald-50 dark:bg-emerald-400/10 text-emerald-500 dark:text-emerald-400 border-emerald-200 dark:border-emerald-400/30',
      result: 'Sitios rápidos · SEO optimizado · Responsive-first'
    },
    {
      title: 'Publicidad Digital',
      description: 'Llevo tráfico de Google directamente a tu página. Las personas buscan lo que ofreces, hacen click y te contactan por WhatsApp.',
      includes: ['Google Ads', 'Google Analytics 4', 'Landing Pages', 'Copywriting', 'CRO'],
      icon: this.getIconSafe('Google Ads'),
      iconClass: 'bg-indigo-50 dark:bg-indigo-400/10 text-indigo-500 dark:text-indigo-400 border-indigo-200 dark:border-indigo-400/30',
      result: 'CTR 6.8% · CPA -35% · 92% retención clientes'
    },
    {
      title: 'Análisis de Datos',
      description: 'Transformo datos crudos en dashboards interactivos que cuentan una historia. Ventas, campañas, inventario — lo que necesitas para tomar mejores decisiones.',
      includes: ['Power BI', 'Looker Studio', 'Google Analytics 4', 'SQL', 'Python'],
      icon: this.getIconSafe('PowerBI'),
      iconClass: 'bg-yellow-50 dark:bg-yellow-400/10 text-yellow-500 dark:text-yellow-400 border-yellow-200 dark:border-yellow-400/30',
      result: 'Dashboards automatizados · Decisiones basadas en datos'
    },
    {
      title: 'Automatización con IA',
      description: 'Automatizo procesos repetitivos usando inteligencia artificial. Desde chatbots que responden clientes hasta flujos de trabajo que se ejecutan solos.',
      includes: ['n8n', 'Flowise', 'Ollama', 'Python'],
      icon: this.getIconSafe('n8n'),
      iconClass: 'bg-cyan-50 dark:bg-cyan-400/10 text-cyan-500 dark:text-cyan-400 border-cyan-200 dark:border-cyan-400/30',
      result: 'Ahorro de tiempo · Reducción de errores · Escalabilidad'
    },
    {
      title: 'Seguridad de Software',
      description: 'Audito y protejo aplicaciones web contra vulnerabilidades. Identifico riesgos antes de que los encuentren los atacantes, bajo estándares OWASP y NIST.',
      includes: ['OWASP', 'NIST', 'Trivy', 'SonarQube'],
      icon: this.getIconSafe('SonarQube'),
      iconClass: 'bg-pink-50 dark:bg-pink-400/10 text-pink-500 dark:text-pink-400 border-pink-200 dark:border-pink-400/30',
      result: 'Vulnerabilidades detectadas · Cumplimiento normativo'
    },
    {
      title: 'Desarrollo Móvil',
      description: 'Aplicaciones nativas Android con Kotlin para negocios que necesitan una app funcional, moderna y que sus clientes quieran usar.',
      includes: ['Kotlin', 'Android Studio', 'REST API', 'Firebase'],
      icon: this.getIconSafe('Java'),
      iconClass: 'bg-orange-50 dark:bg-orange-400/10 text-orange-500 dark:text-orange-400 border-orange-200 dark:border-orange-400/30',
      result: 'Apps nativas · UX nativa · Play Store ready'
    }
  ];

  getIconSafe(tech: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.techIconService.getIcon(tech));
  }
}