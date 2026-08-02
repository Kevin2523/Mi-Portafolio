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
      title: 'Consultoría de TI',
      description: 'Asesoría técnica personalizada para empresas y emprendedores. Analizo tus necesidades y te propongo soluciones tecnológicas que optimizan procesos y reducen costos.',
      icon: this.getIconSafe('Consultoría'),
      iconClass: 'bg-indigo-50 dark:bg-indigo-400/10 text-indigo-500 dark:text-indigo-400 border-indigo-200 dark:border-indigo-400/30',
      result: 'Soluciones a medida · Reducción de costos · Eficiencia operativa'
    },
    {
      title: 'Desarrollo Web',
      description: 'Sitios web completos, landing pages y e-commerce que convierten. Desde una página institucional hasta una tienda online con panel de administración.',
      icon: this.getIconSafe('Angular'),
      iconClass: 'bg-emerald-50 dark:bg-emerald-400/10 text-emerald-500 dark:text-emerald-400 border-emerald-200 dark:border-emerald-400/30',
      result: 'Sitios rápidos · SEO optimizado · Responsive-first'
    },
    {
      title: 'Desarrollo de Aplicaciones',
      description: 'Aplicaciones de escritorio, herramientas internas y sistemas a medida que automatizan procesos empresariales y mejoran la productividad.',
      icon: this.getIconSafe('Aplicaciones'),
      iconClass: 'bg-purple-50 dark:bg-purple-400/10 text-purple-500 dark:text-purple-400 border-purple-200 dark:border-purple-400/30',
      result: 'Automatización · Productividad · Soluciones a medida'
    },
    {
      title: 'Software Personalizado',
      description: 'Desarrollo de software a medida que se adapta exactamente a tus necesidades. Sin soluciones genéricas, todo hecho para tu caso de uso específico.',
      icon: this.getIconSafe('Software'),
      iconClass: 'bg-blue-50 dark:bg-blue-400/10 text-blue-500 dark:text-blue-400 border-blue-200 dark:border-blue-400/30',
      result: '100% personalizado · Escalable · Soporte continuo'
    },
    {
      title: 'Desarrollo de Bases de Datos',
      description: 'Diseño, implementación y optimización de bases de datos relacionales y no relacionales. Estructuras eficientes que crecen con tu negocio.',
      icon: this.getIconSafe('Base de Datos'),
      iconClass: 'bg-amber-50 dark:bg-amber-400/10 text-amber-500 dark:text-amber-400 border-amber-200 dark:border-amber-400/30',
      result: 'Bases optimizadas · Consultas rápidas · Integridad de datos'
    },
    {
      title: 'Desarrollo Móvil',
      description: 'Aplicaciones nativas Android con Kotlin para negocios que necesitan una app funcional, moderna y que sus clientes quieran usar.',
      icon: this.getIconSafe('Móvil'),
      iconClass: 'bg-orange-50 dark:bg-orange-400/10 text-orange-500 dark:text-orange-400 border-orange-200 dark:border-orange-400/30',
      result: 'Apps nativas · UX nativa · Play Store ready'
    },
    {
      title: 'Desarrollo de SaaS',
      description: 'Plataformas SaaS completas con autenticación, suscripciones, multi-tenant y panel de administración. Todo lo que necesitas para tu producto digital.',
      icon: this.getIconSafe('SaaS'),
      iconClass: 'bg-rose-50 dark:bg-rose-400/10 text-rose-500 dark:text-rose-400 border-rose-200 dark:border-rose-400/30',
      result: 'Multi-tenant · Suscripciones · Escalable'
    },
    {
      title: 'Publicidad Digital',
      description: 'Llevo tráfico de Google directamente a tu página. Las personas buscan lo que ofreces, hacen click y te contactan por WhatsApp.',
      icon: this.getIconSafe('Google Ads'),
      iconClass: 'bg-indigo-50 dark:bg-indigo-400/10 text-indigo-500 dark:text-indigo-400 border-indigo-200 dark:border-indigo-400/30',
      result: 'CTR 6.8% · CPA -35% · 92% retención clientes'
    },
    {
      title: 'Análisis de Datos',
      description: 'Transformo datos crudos en dashboards interactivos que cuentan una historia. Ventas, campañas, inventario — lo que necesitas para tomar mejores decisiones.',
      icon: this.getIconSafe('PowerBI'),
      iconClass: 'bg-yellow-50 dark:bg-yellow-400/10 text-yellow-500 dark:text-yellow-400 border-yellow-200 dark:border-yellow-400/30',
      result: 'Dashboards automatizados · Decisiones basadas en datos'
    },
    {
      title: 'Automatización con IA',
      description: 'Automatizo procesos repetitivos usando inteligencia artificial. Desde chatbots que responden clientes hasta flujos de trabajo que se ejecutan solos.',
      icon: this.getIconSafe('n8n'),
      iconClass: 'bg-cyan-50 dark:bg-cyan-400/10 text-cyan-500 dark:text-cyan-400 border-cyan-200 dark:border-cyan-400/30',
      result: 'Ahorro de tiempo · Reducción de errores · Escalabilidad'
    },
    {
      title: 'Gestión en la Nube',
      description: 'Configuración y administración de servidores en la nube. Infraestructura segura, escalable y optimizada para reducir costos operativos.',
      icon: this.getIconSafe('Nube'),
      iconClass: 'bg-teal-50 dark:bg-teal-400/10 text-teal-500 dark:text-teal-400 border-teal-200 dark:border-teal-400/30',
      result: 'Infraestructura segura · Escalable · Costos optimizados'
    }
  ];

  getIconSafe(tech: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.techIconService.getIcon(tech));
  }
}