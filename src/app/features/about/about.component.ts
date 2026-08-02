import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../core/services/scroll-animation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section class="py-24 px-6 w-full max-w-6xl mx-auto relative z-10" id="about" appScrollReveal="fade-up" [delay]="100">
      <div class="flex flex-col md:flex-row gap-12 md:gap-20 items-center">

        <!-- Left: About text -->
        <div class="flex-1" appScrollReveal="fade-up" [delay]="200">
          <div class="mb-8">
            <h2 class="text-3xl md:text-4xl font-bold font-display">
              Sobre mí
            </h2>
            <div class="h-[2px] w-24 bg-gradient-to-r from-indigo-400 via-purple-400 to-transparent dark:from-indigo-400 dark:via-purple-400 to-transparent mt-4"></div>
          </div>

          <div class="space-y-5 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            <p>
              Soy <strong class="text-slate-800 dark:text-slate-200">Técnico en Ingeniería en Desarrollo y Gestión de Software</strong> estudiante de la Licenciatura en Desarrollo y Gestión de Software en la Universidad Tecnológica de Panamá, sede Coclé. Me apasiona crear soluciones web completas — desde el frontend hasta el backend — y también ayudar a negocios a crecer con campañas de Google Ads.
            </p>
            <p>
              He desarrollado proyectos que van desde <strong class="text-slate-800 dark:text-slate-200">sistemas de auditoría con IA</strong> hasta <strong class="text-slate-800 dark:text-slate-200">plataformas e-commerce</strong>, aplicando siempre buenas prácticas de desarrollo de software seguro bajo estándares como <strong class="text-slate-800 dark:text-slate-200">OWASP y NIST</strong>, con herramientas como <strong class="text-slate-800 dark:text-slate-200">Trivy y SonarQube</strong>.
            </p>
          </div>

          <!-- Quick facts -->
          <div class="grid grid-cols-2 gap-4 mt-8" appScrollReveal="fade-up" [delay]="300">
            <div class="p-4 rounded-xl bg-white dark:bg-cyber-900/60 border border-slate-200 dark:border-slate-800/60">
              <span class="block text-2xl font-bold text-indigo-600 dark:text-indigo-400 font-display">3+</span>
              <span class="text-xs font-mono text-slate-500 dark:text-slate-500">Proyectos publicados</span>
            </div>
            <div class="p-4 rounded-xl bg-white dark:bg-cyber-900/60 border border-slate-200 dark:border-slate-800/60">
              <span class="block text-2xl font-bold text-purple-600 dark:text-purple-400 font-display">12+</span>
              <span class="text-xs font-mono text-slate-500 dark:text-slate-500">Tecnologías dominadas</span>
            </div>
          </div>
        </div>

        <!-- Right: Info card -->
                <div class="flex-1 flex justify-center" appScrollReveal="fade-right" [delay]="200">
          <div class="w-full max-w-sm rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/60 bg-white dark:bg-cyber-900/60 shadow-xl shadow-indigo-200/20 dark:shadow-[0_0_40px_rgba(34,211,238,0.04)]">
           
            <!-- Header dots -->
            <div class="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-red-400/80"></div>
              <div class="w-3 h-3 rounded-full bg-amber-400/80"></div>
              <div class="w-3 h-3 rounded-full bg-emerald-400/80"></div>
              <span class="ml-3 text-sm font-medium text-slate-400 dark:text-slate-600">Información</span>
            </div>

            <div class="p-6 space-y-5">
              <div>
                <span class="block text-xs text-indigo-500 dark:text-indigo-400 font-medium mb-1">Nombre</span>
                <span class="block text-sm text-slate-800 dark:text-slate-200">Kevin Mena</span>
              </div>
              <div>
                <span class="block text-xs text-purple-500 dark:text-purple-400 font-medium mb-1">Rol</span>
                <span class="block text-sm text-slate-800 dark:text-slate-200">Full-Stack Developer</span>
              </div>
              <div>
                <span class="block text-xs text-emerald-500 dark:text-emerald-400 font-medium mb-1">Ubicación</span>
                <span class="block text-sm text-slate-800 dark:text-slate-200">San Carlos, Panamá 🇵🇦</span>
              </div>
              <div>
                <span class="block text-xs text-pink-500 dark:text-pink-400 font-medium mb-1">Educación</span>
                <span class="block text-sm text-slate-800 dark:text-slate-200">Lic. en Desarrollo y Gestión de Software — UTP Coclé</span>
              </div>
              <div>
                <span class="block text-xs text-amber-500 dark:text-amber-400 font-medium mb-1">Enfoque</span>
                <div class="flex flex-wrap gap-2 mt-1">
                  <span class="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-xs text-indigo-600 dark:text-indigo-400">Web Dev</span>
                  <span class="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 text-xs text-purple-600 dark:text-purple-400">Google Ads</span>
                  <span class="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400">IA Security</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class AboutComponent { }
