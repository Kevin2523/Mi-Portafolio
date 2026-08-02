import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityService } from './accessibility.service';

@Component({
  selector: 'app-skip-link',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a 
      href="#main-content" 
      class="skip-link"
      (click)="onClick($event)"
    >
      Saltar al contenido principal
    </a>
  `,
  styles: [`
    .skip-link {
      position: absolute;
      top: -100%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      padding: 12px 24px;
      background: #6366f1;
      color: white;
      font-weight: 600;
      border-radius: 0 0 8px 8px;
      text-decoration: none;
      transition: top 0.2s ease;
    }
    .skip-link:focus {
      top: 0;
      outline: 3px solid #fff;
      outline-offset: 2px;
    }
    .dark .skip-link {
      background: #818cf8;
    }
    @media (prefers-reduced-motion: reduce) {
      .skip-link {
        transition: none;
      }
    }
  `]
})
export class SkipLinkComponent {
  private a11y = inject(AccessibilityService);

  onClick(event: Event): void {
    event.preventDefault();
    const target = document.getElementById('main-content');
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: this.a11y.prefersReducedMotion() ? 'auto' : 'smooth' });
      this.a11y.announce('Saltado al contenido principal');
    }
  }
}