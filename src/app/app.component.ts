import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UiStateService } from './core/services/ui-state.service';
import { ProjectModalComponent } from './shared/components/project-modal/project-modal.component';
import { SkipLinkComponent } from './core/services/skip-link.component';
import { PwaInstallPromptComponent } from './shared/components/pwa-install-prompt/pwa-install-prompt.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ProjectModalComponent, SkipLinkComponent, PwaInstallPromptComponent],
  template: `
    <main [class.dark]="uiState.isDarkMode()">

      <!-- Skip Link -->
      <app-skip-link></app-skip-link>

      <div class="relative min-h-screen bg-slate-50 dark:bg-[#0a0a0f] text-slate-800 dark:text-slate-200 font-display transition-colors duration-500 overflow-x-hidden selection:bg-indigo-200 dark:selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-white">

        <!-- Top gradient bar -->
        <div class="fixed top-0 left-0 right-0 h-[3px] z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-80"></div>

        <!-- Navbar -->
        <nav class="fixed top-3 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-4xl">
          <div class="flex items-center justify-between px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-800/60 bg-white/90 dark:bg-[#0a0a0f]/90 backdrop-blur-xl shadow-sm shadow-slate-200/60 dark:shadow-[0_0_30px_rgba(34,211,238,0.04)]">
           
            <!-- Logo -->
            <a href="/" class="flex items-center gap-3 group">
              <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-500 dark:to-purple-600 flex items-center justify-center font-display font-bold text-sm text-white shadow-sm">
                KM
              </div>
              <span class="hidden md:block font-display font-semibold text-sm text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Kevin Mena
              </span>
            </a>

            <!-- Nav Links (Desktop) -->
            <div class="hidden md:flex items-center gap-1">
              @for (item of navItems; track item.label) {
                <a [href]="item.href"
                   class="px-4 py-2 rounded-lg text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-all duration-200">
                  {{ item.label }}
                </a>
              }
            </div>

            <!-- Right side -->
            <div class="flex items-center gap-3">
              <!-- Theme toggle -->
              <button
                type="button"
                (click)="uiState.toggleTheme()"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900/50 text-sm text-slate-500 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 shadow-sm dark:shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#0a0a0f]"
              >
                @if (uiState.isDarkMode()) {
                  <span>🌙</span>
                  <span class="hidden sm:inline">Oscuro</span>
                } @else {
                  <span>☀️</span>
                  <span class="hidden sm:inline">Claro</span>
                }
              </button>

              <!-- Mobile menu -->
              <button
                type="button"
                (click)="mobileOpen = !mobileOpen"
                class="md:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800/60 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  @if (mobileOpen) {
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  } @else {
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                  }
                </svg>
              </button>
            </div>
          </div>

          <!-- Mobile dropdown -->
          @if (mobileOpen) {
            <div class="mt-2 p-4 rounded-2xl border border-slate-200 dark:border-slate-800/60 bg-white/95 dark:bg-[#0a0a0f]/95 backdrop-blur-xl shadow-lg dark:shadow-none md:hidden">
              <div class="flex flex-col gap-1">
                @for (item of navItems; track item.label) {
                  <a [href]="item.href" 
                     class="px-4 py-3 rounded-lg text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-all"
                     (click)="mobileOpen = false">
                    {{ item.label }}
                  </a>
                }
              </div>
            </div>
          }
        </nav>

        <!-- Main Content -->
        <div class="relative z-10 flex flex-col min-h-screen pt-20">
          <main id="main-content" tabindex="-1">
            <router-outlet></router-outlet>
          </main>
         
          <!-- Footer -->
          <footer class="mt-auto py-10 text-center relative z-10">
            <div class="inline-flex items-center gap-4 px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/60 backdrop-blur shadow-sm dark:shadow-none">
              <span class="font-display text-sm text-slate-500 dark:text-slate-400">
                Kevin Mena <span class="text-slate-300 dark:text-slate-600">·</span> © 2026
              </span>
              <span class="w-px h-4 bg-slate-200 dark:bg-slate-700"></span>
              <span class="font-display text-sm text-slate-400 dark:text-slate-500">San Carlos, Panamá</span>
            </div>
          </footer>
        </div>

      </div>

      <!-- Project Modal -->
      <app-project-modal 
        [project]="uiState.activeModalProject()!" 
        [isOpen]="uiState.isModalOpen()" 
        (closed)="uiState.closeModal()"
      ></app-project-modal>

      <!-- PWA Install Prompt -->
      <app-pwa-install-prompt></app-pwa-install-prompt>

    </main>
  `
})
export class AppComponent {
  uiState = inject(UiStateService);
  mobileOpen = false;

  navItems = [
    { label: 'inicio', href: '/' },
    { label: 'trayectoria', href: '/#experience' },
    { label: 'proyectos', href: '/#projects' },
    { label: 'servicios', href: '/#services' },
    { label: 'contacto', href: '/#contact' },
  ];
}