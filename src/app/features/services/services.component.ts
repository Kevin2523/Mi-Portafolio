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
      title: 'Consultoría de TI',
      description: 'Asesoría técnica personalizada para empresas y emprendedores. Analizo tus necesidades y te propongo soluciones tecnológicas que optimizan procesos y reducen costos.',
      includes: ['Análisis de requerimientos', 'Arquitectura de software', 'Optimización de procesos', 'Selección tecnológica'],
      icon: this.getIconSafe('Consultoría'),
      iconClass: 'bg-indigo-50 dark:bg-indigo-400/10 text-indigo-500 dark:text-indigo-400 border-indigo-200 dark:border-indigo-400/30',
      result: 'Soluciones a medida · Reducción de costos · Eficiencia operativa'
    },
    {
      title: 'Soporte Técnico de Redes',
      description: 'Mantenimiento, configuración y solución de problemas de redes. Conectividad estable y segura para tu negocio o institución.',
      includes: ['Configuración de redes', 'Diagnóstico de fallas', 'Mantenimiento preventivo', 'Seguridad de red'],
      icon: this.getIconSafe('Redes'),
      iconClass: 'bg-cyan-50 dark:bg-cyan-400/10 text-cyan-500 dark:text-cyan-400 border-cyan-200 dark:border-cyan-400/30',
      result: 'Conectividad estable · Soporte rápido · Redes seguras'
    },
    {
      title: 'Desarrollo Web',
      description: 'Sitios web completos, landing pages y e-commerce que convierten. Desde una página institucional hasta una tienda online con panel de administración.',
      includes: ['Angular', 'WordPress', 'PHP', 'MySQL', 'Tailwind CSS'],
      icon: this.getIconSafe('Angular'),
      iconClass: 'bg-emerald-50 dark:bg-emerald-400/10 text-emerald-500 dark:text-emerald-400 border-emerald-200 dark:border-emerald-400/30',
      result: 'Sitios rápidos · SEO optimizado · Responsive-first'
    },
    {
      title: 'Desarrollo de Aplicaciones',
      description: 'Aplicaciones web completas con panel de administración, autenticación, base de datos y funcionalidades a medida para tu negocio.',
      includes: ['Angular', 'NestJS', 'Node.js', 'PostgreSQL', 'REST API'],
      icon: this.getIconSafe('Aplicaciones'),
      iconClass: 'bg-purple-50 dark:bg-purple-400/10 text-purple-500 dark:text-purple-400 border-purple-200 dark:border-purple-400/30',
      result: 'Apps escalables · Panel admin · Autenticación segura'
    },
    {
      title: 'Software Personalizado',
      description: 'Desarrollo de software a medida que se adapta exactamente a tus necesidades. Sin soluciones genéricas, todo hecho para tu caso de uso específico.',
      includes: ['Análisis de requerimientos', 'Desarrollo full-stack', 'Testing', 'Despliegue y soporte'],
      icon: this.getIconSafe('Software'),
      iconClass: 'bg-blue-50 dark:bg-blue-400/10 text-blue-500 dark:text-blue-400 border-blue-200 dark:border-blue-400/30',
      result: '100% personalizado · Escalable · Soporte continuo'
    },
    {
      title: 'Desarrollo de Bases de Datos',
      description: 'Diseño, implementación y optimización de bases de datos relacionales y no relacionales. Estructuras eficientes que crecen con tu negocio.',
      includes: ['MySQL', 'PostgreSQL', 'MongoDB', 'Modelado de datos', 'Optimización de consultas'],
      icon: this.getIconSafe('Base de Datos'),
      iconClass: 'bg-amber-50 dark:bg-amber-400/10 text-amber-500 dark:text-amber-400 border-amber-200 dark:border-amber-400/30',
      result: 'Bases optimizadas · Consultas rápidas · Integridad de datos'
    },
    {
      title: 'Desarrollo Móvil',
      description: 'Aplicaciones nativas Android con Kotlin para negocios que necesitan una app funcional, moderna y que sus clientes quieran usar.',
      includes: ['Kotlin', 'Android Studio', 'REST API', 'Firebase'],
      icon: this.getIconSafe('Móvil'),
      iconClass: 'bg-orange-50 dark:bg-orange-400/10 text-orange-500 dark:text-orange-400 border-orange-200 dark:border-orange-400/30',
      result: 'Apps nativas · UX nativa · Play Store ready'
    },
    {
      title: 'Desarrollo de SaaS',
      description: 'Plataformas SaaS completas con autenticación, suscripciones, multi-tenant y panel de administración. Todo lo que necesitas para tu producto digital.',
      includes: ['Angular', 'NestJS', 'PostgreSQL', 'Docker', 'CI/CD', 'Autenticación'],
      icon: this.getIconSafe('SaaS'),
      iconClass: 'bg-rose-50 dark:bg-rose-400/10 text-rose-500 dark:text-rose-400 border-rose-200 dark:border-rose-400/30',
      result: 'Multi-tenant · Suscripciones · Escalable'
    },
    {
      title: 'Gestión en la Nube',
      description: 'Configuración y administración de servidores en la nube. Infraestructura segura, escalable y optimizada para reducir costos operativos.',
      includes: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Linux'],
      icon: this.getIconSafe('Nube'),
      iconClass: 'bg-teal-50 dark:bg-teal-400/10 text-teal-500 dark:text-teal-400 border-teal-200 dark:border-teal-400/30',
      result: 'Infraestructura segura · Escalable · Costos optimizados'
    },
    {
      title: 'Apps en la Nube',
      description: 'Desarrollo de aplicaciones cloud-native diseñadas para la nube desde el inicio. Microservicios, contenedores y despliegue continuo.',
      includes: ['Docker', 'Kubernetes', 'CI/CD', 'Microservicios', 'Serverless'],
      icon: this.getIconSafe('Cloud Native'),
      iconClass: 'bg-violet-50 dark:bg-violet-400/10 text-violet-500 dark:text-violet-400 border-violet-200 dark:border-violet-400/30',
      result: 'Cloud-native · Microservicios · Despliegue continuo'
    }
  ];

  getIconSafe(tech: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.techIconService.getIcon(tech));
  }
}