import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

export interface ExperienceItem {
  id: string;
  regCode: string;
  year: string;
  roleKey: string;
  companyKey: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <section class="experience section dark-section" id="experiencia" data-nav="experiencia">
      <header class="section-heading reveal is-visible">
        <div>
          <p class="section-kicker">{{ 'experience.kicker' | t }}</p>
          <h2>{{ 'experience.title' | t }}</h2>
        </div>
        <span class="vertical-note">{{ 'experience.note' | t }}</span>
      </header>

      <div class="timeline reveal is-visible hanging-files" id="experienceFiles">
        <div class="file-rail" aria-hidden="true"></div>

        @for (item of experienceList; track item.id; let idx = $index) {
          <article
            tabindex="0"
            [class.is-open]="openId() === item.id"
            (click)="selectExperience(item.id)"
            (keydown.enter)="selectExperience(item.id)"
            (keydown.space)="selectExperience(item.id)"
          >
            <time>{{ item.year }}</time>
            <div>
              <span>{{ item.regCode }}</span>
              <h3>{{ item.roleKey | t }}</h3>
              <p>{{ item.companyKey | t }}</p>
            </div>
          </article>
        }
      </div>
    </section>
  `
})
export class ExperienceComponent {
  openId = signal<string | null>('rosero');

  experienceList: ExperienceItem[] = [
    {
      id: 'rosero',
      regCode: 'REG. 08-01',
      year: '2026',
      roleKey: 'exp.rosero.role',
      companyKey: 'exp.rosero.company'
    },
    {
      id: 'jornada',
      regCode: 'REG. 08-02',
      year: '2026',
      roleKey: 'exp.jornada.role',
      companyKey: 'exp.jornada.company'
    },
    {
      id: 'clientes',
      regCode: 'REG. 08-03',
      year: '2026 – Actual',
      roleKey: 'exp.web.role',
      companyKey: 'exp.web.company'
    }
  ];

  selectExperience(id: string): void {
    this.openId.update(prev => (prev === id ? null : id));
  }
}