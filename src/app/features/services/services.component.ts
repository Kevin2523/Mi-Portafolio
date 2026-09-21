import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

export interface RolodexService {
  number: string;
  titleKey: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <section class="services section" id="servicios" data-nav="servicios">
      <header class="section-heading reveal is-visible">
        <div>
          <p class="section-kicker">{{ 'services.kicker' | t }}</p>
          <h2>{{ 'services.title' | t }}</h2>
          <p>{{ 'services.subtitle' | t }}</p>
        </div>
      </header>

      <div class="service-files reveal is-visible rolodex" id="serviceRolodex">
        <div class="rolodex-rail rail-left" aria-hidden="true"></div>
        <div class="rolodex-rail rail-right" aria-hidden="true"></div>

        @for (item of serviceList; track item.number; let idx = $index) {
          <button
            type="button"
            [class.is-active]="selectedIndex() === idx"
            [class.is-before]="selectedIndex() !== null && idx < selectedIndex()!"
            (click)="selectService(idx)"
          >
            <span>{{ item.number }}</span>
            <strong>{{ item.titleKey | t }}</strong>
            <i>↗</i>
          </button>
        }
      </div>
    </section>
  `
})
export class ServicesComponent {
  selectedIndex = signal<number | null>(0);

  serviceList: RolodexService[] = [
    { number: '01', titleKey: 'srv.core.software.title' },
    { number: '02', titleKey: 'srv.core.web.title' },
    { number: '03', titleKey: 'srv.core.ai.title' },
    { number: '04', titleKey: 'srv.core.ads.title' },
    { number: '05', titleKey: 'srv.core.security.title' }
  ];

  selectService(index: number): void {
    this.selectedIndex.set(index);
  }
}