import { Component, inject, effect, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';

@Component({
  selector: 'app-pwa-install-prompt',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (showInstallPrompt()) {
      <div class="fixed bottom-4 right-4 left-4 md:right-4 md:left-auto md:w-96 z-50 animate-slide-up">
        <div class="bg-white dark:bg-[#0a0a0f] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-5">
          <div class="flex items-start gap-3">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-slate-800 dark:text-white">Instalar App</h3>
              <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Añade este portafolio a tu pantalla de inicio para acceso rápido sin conexión.
              </p>
            </div>
            <button 
              type="button"
              (click)="dismiss()"
              class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              aria-label="Cerrar"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="flex gap-3 mt-4">
            <button
              type="button"
              (click)="install()"
              class="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25"
            >
              Instalar
            </button>
            <button
              type="button"
              (click)="dismiss()"
              class="px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Luego
            </button>
          </div>
        </div>
      </div>
    }

    @if (updateAvailable()) {
      <div class="fixed bottom-4 right-4 left-4 md:right-4 md:left-auto md:w-96 z-50 animate-slide-up">
        <div class="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl shadow-2xl p-5">
          <div class="flex items-start gap-3">
            <div class="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-emerald-800 dark:text-emerald-200">Actualización disponible</h3>
              <p class="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                Hay una nueva versión lista. Recarga para obtener las últimas mejoras.
              </p>
            </div>
          </div>
          <button
            type="button"
            (click)="applyUpdate()"
            class="w-full mt-4 px-4 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Actualizar ahora
          </button>
        </div>
      </div>
    }

    @if (offline()) {
      <div class="fixed top-0 left-0 right-0 z-50 animate-slide-down bg-amber-600 text-white px-4 py-2 text-center text-sm font-medium">
        Modo offline — Algunos contenidos pueden no estar disponibles
      </div>
    }
  `,
  styles: [`
    @keyframes slide-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slide-down {
      from { opacity: 0; transform: translateY(-100%); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
    .animate-slide-down { animation: slide-down 0.3s ease-out forwards; }
    @media (prefers-reduced-motion: reduce) {
      .animate-slide-up, .animate-slide-down { animation: none !important; }
    }
  `]
})
export class PwaInstallPromptComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly swUpdate = inject(SwUpdate);

  readonly showInstallPrompt = signal(false);
  readonly updateAvailable = signal(false);
  readonly offline = signal(false);
  private deferredPrompt: any = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initInstallPrompt();
      this.initServiceWorkerUpdates();
      this.initOfflineDetection();
    }
  }

  private initInstallPrompt(): void {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      // Show after 30 seconds or on user interaction
      setTimeout(() => this.showInstallPrompt.set(true), 30000);
    });

    window.addEventListener('appinstalled', () => {
      this.showInstallPrompt.set(false);
      this.deferredPrompt = null;
    });
  }

  private initServiceWorkerUpdates(): void {
    this.swUpdate.versionUpdates.subscribe((event: any) => {
      if (event.type === 'VERSION_READY') {
        this.updateAvailable.set(true);
      }
    });
  }

  private initOfflineDetection(): void {
    const updateOnlineStatus = () => {
      this.offline.set(!navigator.onLine);
    };
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
  }

  async install(): Promise<void> {
    if (!this.deferredPrompt) return;
    
    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      this.showInstallPrompt.set(false);
    }
    this.deferredPrompt = null;
  }

  dismiss(): void {
    this.showInstallPrompt.set(false);
    this.updateAvailable.set(false);
  }

  applyUpdate(): void {
    this.swUpdate.activateUpdate().then(() => {
      window.location.reload();
    });
  }
}