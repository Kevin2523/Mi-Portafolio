import { Injectable, signal, computed, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  private readonly platformId = inject(PLATFORM_ID);

  // Signals for accessibility state
  readonly prefersReducedMotion = signal(false);
  readonly prefersHighContrast = signal(false);
  readonly prefersColorScheme = signal<'light' | 'dark'>('dark');
  readonly isKeyboardNavigation = signal(false);
  readonly focusVisible = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initMediaQueries();
      this.initKeyboardDetection();
      this.initFocusVisible();
    }
  }

  private initMediaQueries(): void {
    // Reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.prefersReducedMotion.set(motionQuery.matches);
    motionQuery.addEventListener?.('change', (e) => this.prefersReducedMotion.set(e.matches));

    // High contrast
    const contrastQuery = window.matchMedia('(prefers-contrast: more)');
    this.prefersHighContrast.set(contrastQuery.matches);
    contrastQuery.addEventListener?.('change', (e) => this.prefersHighContrast.set(e.matches));

    // Color scheme
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.prefersColorScheme.set(colorSchemeQuery.matches ? 'dark' : 'light');
    colorSchemeQuery.addEventListener?.('change', (e) => this.prefersColorScheme.set(e.matches ? 'dark' : 'light'));
  }

  private initKeyboardDetection(): void {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.isKeyboardNavigation.set(true);
      }
    });

    document.addEventListener('mousedown', () => {
      this.isKeyboardNavigation.set(false);
    });
  }

  private initFocusVisible(): void {
    // Polyfill for :focus-visible
    const style = document.createElement('style');
    style.textContent = `
      .focus-visible:focus:not(.focus-visible-keyboard) {
        outline: none;
      }
      .focus-visible-keyboard:focus {
        outline: 2px solid #6366f1;
        outline-offset: 2px;
      }
      .dark .focus-visible-keyboard:focus {
        outline-color: #818cf8;
      }
    `;
    document.head.appendChild(style);
  }

  // Announce to screen readers
  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const region = document.getElementById('a11y-announcer') || this.createAnnouncer();
    region.setAttribute('aria-live', priority);
    region.textContent = '';
    // Force reflow
    region.offsetHeight;
    region.textContent = message;
  }

  private createAnnouncer(): HTMLElement {
    const region = document.createElement('div');
    region.id = 'a11y-announcer';
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    region.className = 'sr-only';
    document.body.appendChild(region);
    return region;
  }

  // Generate unique IDs for ARIA relationships
  private idCounter = 0;
  generateId(prefix = 'a11y'): string {
    return `${prefix}-${++this.idCounter}-${Date.now()}`;
  }

  // Trap focus within an element (for modals)
  trapFocus(element: HTMLElement): () => void {
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    element.addEventListener('keydown', handler);
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handler);
    };
  }
}