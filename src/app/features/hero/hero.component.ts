import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvDownloadComponent } from '../../shared/components/cv-download/cv-download.component';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, CvDownloadComponent, TranslatePipe],
  template: `
    <section class="hero section" id="inicio" data-nav="inicio">
      <div class="hero-copy reveal is-visible" [class.is-dimmed]="binderOpen()" (click)="binderOpen() ? toggleBinder() : null">
        <div class="archive-label"><span>{{ 'hero.archive' | t }}</span><span>{{ 'hero.profile' | t }}</span></div>
        <p class="eyebrow">{{ 'hero.greeting' | t }}</p>
        <h1><span>Kevin</span> <em>Mena</em></h1>
        <div class="hero-rule" aria-hidden="true"></div>
        <h2>{{ 'hero.title' | t }}</h2>
        <p>{{ 'hero.bio1' | t }}</p>
        <p>{{ 'hero.bio2' | t }}</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#contacto">{{ 'hero.btn.contact' | t }} <span aria-hidden="true">→</span></a>
          <app-cv-download></app-cv-download>
        </div>
        <p class="hand-note">{{ 'hero.handnote' | t }}</p>
      </div>

      <aside class="hero-index reveal is-visible master-binder" [class.is-open]="binderOpen()" id="masterBinder" aria-label="Archivo maestro sobre mí">
        <button class="binder-cover" id="binderCover" type="button" [attr.aria-expanded]="binderOpen()" (click)="toggleBinder()" aria-label="Abrir o cerrar archivo maestro sobre mí">
          <!-- Cara exterior de la portada -->
          <div class="binder-cover-front">
            <span class="binder-spine" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
            <span class="binder-label">
              <small>{{ 'hero.dossier' | t }}</small>
              <strong>{{ 'hero.aboutMe' | t }}</strong>
              <i>KM / 2026</i>
            </span>
            <span class="binder-corner">{{ 'hero.open' | t }} ↗</span>
          </div>

          <!-- Cara interior de la portada (visible al abrir en 3D - interior limpio y vacío) -->
          <div class="binder-cover-back" aria-hidden="true">
            <span class="binder-spine-inner"><i></i><i></i><i></i><i></i></span>
          </div>
        </button>

        <div class="binder-body">
          <div class="index-head">
            <p>{{ 'hero.dossier' | t }} <span>×</span><br>{{ 'hero.aboutMe' | t }}</p>
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
              <span class="file-code">KM/2026</span>
              @if (binderOpen()) {
                <button
                  type="button"
                  class="binder-close-btn"
                  (click)="toggleBinder()"
                  aria-label="Cerrar libro"
                >
                  {{ 'hero.close' | t }} ↖
                </button>
              }
            </div>
          </div>

          <div class="binder-profile-content">
            <h3 class="binder-profile-title">{{ 'hero.profileTitle' | t }}</h3>
            <p class="binder-profile-bio">{{ 'hero.profileBio' | t }}</p>

            <div class="binder-profile-grid">
              <div class="profile-meta-card">
                <span class="meta-label">{{ 'hero.meta.location' | t }}</span>
                <strong class="meta-val">{{ 'hero.meta.locationVal' | t }}</strong>
              </div>
              <div class="profile-meta-card">
                <span class="meta-label">{{ 'hero.meta.specialty' | t }}</span>
                <strong class="meta-val">Full-Stack &amp; IA</strong>
              </div>
              <div class="profile-meta-card">
                <span class="meta-label">{{ 'hero.meta.focus' | t }}</span>
                <strong class="meta-val">{{ 'hero.meta.focusVal' | t }}</strong>
              </div>
              <div class="profile-meta-card">
                <span class="meta-label">{{ 'hero.meta.goal' | t }}</span>
                <strong class="meta-val">{{ 'hero.meta.goalVal' | t }}</strong>
              </div>
            </div>
          </div>

          <span class="paperclip" aria-hidden="true"></span>
        </div>
      </aside>
    </section>
  `
})
export class HeroComponent {
  binderOpen = signal<boolean>(false);

  toggleBinder(): void {
    this.binderOpen.update(val => !val);
  }

  openBinder(): void {
    this.binderOpen.set(true);
  }
}
