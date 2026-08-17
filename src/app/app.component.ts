import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UiStateService } from './core/services/ui-state.service';
import { ProjectModalComponent } from './shared/components/project-modal/project-modal.component';
import { SkipLinkComponent } from './core/services/skip-link.component';
import { LanguageSwitcherComponent } from './shared/components/language-switcher/language-switcher.component';
import { TranslatePipe } from './core/i18n/translate.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ProjectModalComponent, SkipLinkComponent, LanguageSwitcherComponent, TranslatePipe],
  template: `
    <main [class.dark]="uiState.isDarkMode()">

      <!-- Skip Link -->
      <app-skip-link></app-skip-link>

      <div class="relative min-h-screen bg-slate-50 dark:bg-[#0a0a0f] text-slate-800 dark:text-slate-200 font-display transition-colors duration-500 overflow-x-hidden selection:bg-indigo-200 dark:selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-white">

        <!-- Top gradient bar -->
        <div class="fixed top-0 left-0 right-0 h-[3px] z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-80"></div>

        <!-- Navbar -->
        <nav class="fixed top-3 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-6xl">
          <div class="flex items-center justify-between px-4 lg:px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-800/60 bg-white/90 dark:bg-[#0a0a0f]/90 backdrop-blur-xl shadow-sm shadow-slate-200/60 dark:shadow-[0_0_30px_rgba(34,211,238,0.04)]">
          
            <!-- Logo -->
            <a href="/" class="flex items-center gap-3 group">
              <img src="/profile.png" alt="Kevin Mena" class="w-9 h-9 rounded-lg object-cover shadow-sm">
              <span class="hidden sm:block font-display font-semibold text-sm text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Kevin Mena
              </span>
            </a>

            <!-- Nav Links (Desktop) -->
            <div class="hidden lg:flex items-center gap-0.5">
              @for (item of navItems; track item.key) {
                <a [href]="item.href"
                   class="px-2.5 py-2 rounded-lg text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-all duration-200">
                  {{ item.key | t }}
                </a>
              }
            </div>

            <!-- Right side -->
            <div class="flex items-center gap-3">
              <!-- Language Switcher -->
              <app-language-switcher></app-language-switcher>

              <!-- Theme toggle -->
              <button
                type="button"
                (click)="uiState.toggleTheme()"
                class="inline-flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900/50 text-sm text-slate-500 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 shadow-sm dark:shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#0a0a0f]"
              >
                @if (uiState.isDarkMode()) {
                  <span class="text-base leading-none">🌙</span>
                  <span class="hidden xl:inline leading-none font-medium mt-[1px]">{{ 'common.dark' | t }}</span>
                } @else {
                  <span class="text-base leading-none">☀️</span>
                  <span class="hidden xl:inline leading-none font-medium mt-[1px]">{{ 'common.light' | t }}</span>
                }
              </button>

              <!-- Mobile menu -->
              <button
                type="button"
                (click)="mobileOpen = !mobileOpen"
                class="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800/60 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
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
            <div class="mt-2 p-4 rounded-2xl border border-slate-200 dark:border-slate-800/60 bg-white/95 dark:bg-[#0a0a0f]/95 backdrop-blur-xl shadow-lg dark:shadow-none lg:hidden">
              <div class="flex flex-col gap-1">
                @for (item of navItems; track item.key) {
                  <a [href]="item.href" 
                     class="px-4 py-3 rounded-lg text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-all"
                     (click)="navigateTo(item.href)">
                    {{ item.key | t }}
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

    </main>
  `
})
export class AppComponent {
  uiState = inject(UiStateService);
  mobileOpen = false;

  navItems = [
    { key: 'header.nav.home', href: '/' },
    { key: 'header.nav.about', href: '/#about' },
    { key: 'header.nav.experience', href: '/#experience' },
    { key: 'header.nav.skills', href: '/#skills' },
    { key: 'header.nav.projects', href: '/#projects' },
    { key: 'header.nav.services', href: '/#services' },
    { key: 'header.nav.contact', href: '/#contact' },
  ];

  navigateTo(href: string): void {
    this.mobileOpen = false;
    
    if (href.startsWith('/#')) {
      // Anchor link - scroll to section
      const sectionId = href.substring(2);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href === '/') {
      // Home - scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}