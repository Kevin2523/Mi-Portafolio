import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

export type SkillCategoryKey = 'frontend' | 'backend' | 'ai' | 'security';

export interface SkillCategoryTab {
  key: SkillCategoryKey;
  labelKey: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <section class="skills section" id="habilidades" data-nav="habilidades">
      <header class="section-heading reveal is-visible">
        <div>
          <p class="section-kicker">{{ 'skills.kicker' | t }}</p>
          <h2>{{ 'skills.title' | t }}</h2>
        </div>
      </header>

      <div
        class="skill-catalog reveal is-visible catalog-machine"
        [class.is-open]="isOpen()"
        [class.is-shuffling]="isShuffling()"
        id="skillCatalog"
      >
        <div class="catalog-handle" aria-hidden="true">
          <i></i>
          <span>{{ 'skills.catalog' | t }}</span>
        </div>

        <div class="skill-main">
          <div class="skill-tabs" role="tablist" aria-label="Categorías de habilidades">
            @for (tab of tabs; track tab.key) {
              <button
                role="tab"
                [attr.aria-selected]="activeCategory() === tab.key"
                (click)="selectCategory(tab.key)"
              >
                {{ tab.labelKey | t }}
              </button>
            }
          </div>

          <div class="skill-cards" id="skillCards" role="tabpanel" aria-live="polite">
            @for (skill of currentSkills(); track skill; let idx = $index) {
              <article class="skill-card" [style.animationDelay.ms]="idx * 35">
                <span>{{ 'skills.card' | t }} 0{{ idx + 1 }}</span>
                <strong>{{ skill }}</strong>
              </article>
            }
          </div>
        </div>

        <aside class="skill-aside">
          <span>{{ 'skills.classification' | t }}</span>
          <strong>Full-Stack &amp;<br>Security First</strong>
          <p>OWASP / NIST</p>
        </aside>
      </div>
    </section>
  `
})
export class SkillsComponent {
  activeCategory = signal<SkillCategoryKey>('frontend');
  isShuffling = signal<boolean>(false);
  isOpen = signal<boolean>(true);

  tabs: SkillCategoryTab[] = [
    { key: 'frontend', labelKey: 'skills.cat.frontend' },
    { key: 'backend', labelKey: 'skills.cat.backend' },
    { key: 'ai', labelKey: 'skills.cat.ai' },
    { key: 'security', labelKey: 'skills.security' }
  ];

  skillsData: Record<SkillCategoryKey, string[]> = {
    frontend: ['Angular', 'TypeScript', 'Tailwind', 'HTML5', 'CSS3', 'JavaScript', 'RxJS', 'Signals'],
    backend: ['C#', 'PHP', 'SQL Server', 'MySQL', 'Node.js', 'NestJS'],
    ai: ['IA Generativa', 'Flowise', 'n8n', 'FleetDM'],
    security: ['OWASP', 'NIST', 'DevSecOps', 'Auditoría Continua']
  };

  currentSkills = signal<string[]>(this.skillsData.frontend);

  selectCategory(category: SkillCategoryKey): void {
    if (this.activeCategory() === category) return;

    this.activeCategory.set(category);
    this.isShuffling.set(true);
    this.currentSkills.set(this.skillsData[category]);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(() => {
      this.isShuffling.set(false);
    }, reducedMotion ? 0 : 560);
  }
}
