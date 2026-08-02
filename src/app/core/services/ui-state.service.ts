import { Injectable, computed, effect, signal } from '@angular/core';
import { Project } from '../models/project.model';

export type TerminalStatus = 'idle' | 'sending' | 'success' | 'error';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {
  readonly isDarkMode = signal<boolean>(true);
  readonly isMobileNavOpen = signal<boolean>(false);
  readonly activeSection = signal<string>('hero');

  readonly isModalOpen = signal<boolean>(false);
  readonly activeModalProject = signal<Project | null>(null);

  readonly terminalLogs = signal<string[]>([]);
  readonly terminalStatus = signal<TerminalStatus>('idle');

  readonly isTerminalSending = computed<boolean>(() => this.terminalStatus() === 'sending');
  readonly isTerminalSuccess = computed<boolean>(() => this.terminalStatus() === 'success');
  readonly themeLabel = computed<string>(() => this.isDarkMode() ? 'DARK_MODE' : 'LIGHT_MODE');

  constructor() {
    this.initTheme();

    effect(() => {
      const dark = this.isDarkMode();
      document.documentElement.classList.toggle('dark', dark);
      localStorage.setItem('km_theme', dark ? 'dark' : 'light');
    });
  }

  toggleTheme(): void {
    this.isDarkMode.update(prev => !prev);
  }

  toggleMobileNav(): void {
    this.isMobileNavOpen.update(prev => !prev);
  }

  closeMobileNav(): void {
    this.isMobileNavOpen.set(false);
  }

  setActiveSection(sectionId: string): void {
    this.activeSection.set(sectionId);
  }

  openModal(project: Project): void {
    this.activeModalProject.set(project);
    this.isModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    setTimeout(() => this.activeModalProject.set(null), 300);
    document.body.style.overflow = '';
  }

  addTerminalLog(log: string): void {
    this.terminalLogs.update(logs => [...logs, log]);
  }

  clearTerminal(): void {
    this.terminalLogs.set([]);
  }

  setTerminalStatus(status: TerminalStatus): void {
    this.terminalStatus.set(status);
  }

  async runTerminalSequence(email: string): Promise<void> {
    this.clearTerminal();
    this.setTerminalStatus('sending');

    const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

    const logs: [number, string][] = [
      [200, '> Initializing secure channel...'],
      [600, '> [AUTH] Verifying sender: ' + email],
      [500, '> [SYS] Loading encryption module...'],
      [700, '> [ENCRYPT] AES-256-GCM handshake complete.'],
      [800, '> [NET] Routing packet...'],
      [600, '> [SMTP] Connecting to mail relay...'],
      [900, '> [SMTP] Sending payload...'],
      [500, '> [SUCCESS] Message received at kjmg2325@gmail.com'],
      [300, '> [SYS] Channel closed.']
    ];

    for (const [waitMs, log] of logs) {
      await delay(waitMs);
      this.addTerminalLog(log);
    }

    this.setTerminalStatus('success');
  }

  private initTheme(): void {
    const savedTheme = localStorage.getItem('km_theme');
    this.isDarkMode.set(savedTheme ? savedTheme === 'dark' : true);
  }
}
