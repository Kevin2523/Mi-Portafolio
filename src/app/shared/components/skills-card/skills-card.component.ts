import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TechIconService } from '../../../core/services/tech-icon.service';

@Component({
  selector: 'app-skills-card', standalone: true, imports: [CommonModule],
  template: `
    <div class="skill-reference">
      <div class="skill-tabs">@for (category of categories; track category.name) { <button type="button" (click)="selectedCat.set(category.name)" [class.active]="selectedCat() === category.name">{{ category.label }}</button> }</div>
      <div class="skill-content"><div class="skill-icons">@for (tech of activeCategory().techs; track tech) { <div class="skill-icon"><span [innerHTML]="getIconSafe(tech)"></span><strong>{{ tech }}</strong></div> }</div><aside><strong>Full-Stack &<br>Security First</strong><i></i><small>OWASP / NIST</small></aside></div>
    </div>
  `
})
export class SkillsCardComponent {
  private techIconService = inject(TechIconService); private sanitizer = inject(DomSanitizer);
  selectedCat = signal('Frontend');
  categories = [
    { name: 'Frontend', label: 'Frontend', techs: ['Angular', 'TypeScript', 'Tailwind', 'HTML5', 'CSS3', 'JavaScript', 'RxJS', 'Signals'] },
    { name: 'Backend', label: 'Backend', techs: ['NestJS', 'Node.js', 'PHP', 'PostgreSQL', 'MySQL', 'Docker', 'REST API'] },
    { name: 'AI & Tools', label: 'AI & Tools', techs: ['n8n', 'Flowise', 'Ollama', 'Google Ads', 'WordPress', 'GitHub', 'CI/CD'] },
    { name: 'Seguridad', label: 'Seguridad', techs: ['OWASP Top 10', 'WebAuthn', 'Trivy', 'SonarQube', 'NIST'] }
  ];
  activeCategory() { return this.categories.find(item => item.name === this.selectedCat()) || this.categories[0]; }
  getIconSafe(tech: string): SafeHtml { return this.sanitizer.bypassSecurityTrustHtml(this.techIconService.getIcon(tech)); }
}
