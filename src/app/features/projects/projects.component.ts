import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

export interface CabinetProject {
  id: string;
  code: string;
  type: string;
  titleKey: string;
  subtitleKey: string;
  descKey: string;
  image: string;
  alt: string;
  tags: string[];
  status: string;
  drawerCode: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <section class="projects section" id="proyectos" data-nav="proyectos">
      <header class="section-heading reveal is-visible">
        <div>
          <p class="section-kicker">{{ 'projects.kicker' | t }}</p>
          <h2>{{ 'projects.title' | t }}</h2>
          <p>{{ 'projects.subtitle' | t }}</p>
        </div>
        <div class="classification-stamp" aria-hidden="true" [innerHTML]="'projects.stamp' | t"></div>
      </header>

      <div class="cabinet-experience reveal is-visible" id="cabinetExperience">
        <div class="cabinet-area">
          <div class="cabinet-instruction">
            <span>{{ 'projects.cabinet' | t }}</span>
            <strong>{{ 'projects.instruction' | t }}</strong>
          </div>

          <div class="filing-cabinet" aria-label="Gabinete con cuatro proyectos">
            <div class="cabinet-top">
              <span>KM</span>
              <small>{{ 'projects.activeArchive' | t }}</small>
            </div>

            <div class="drawer-stack">
              @for (item of projectList; track item.id; let idx = $index) {
                <button
                  class="cabinet-drawer"
                  [class.is-open]="activeProjectId() === item.id"
                  type="button"
                  [attr.aria-expanded]="activeProjectId() === item.id"
                  aria-controls="projectDossier"
                  (click)="toggleDrawer(item.id)"
                >
                  <span class="drawer-depth" aria-hidden="true"></span>
                  <span class="manila-folder" aria-hidden="true">
                    <span class="folder-back"><i>EXP. 0{{ idx + 1 }}</i></span>
                    <span class="folder-paper">
                      <b>{{ item.titleKey | t }}</b>
                      <small>{{ item.subtitleKey | t }}</small>
                    </span>
                    <span class="folder-front"></span>
                  </span>
                  <span class="drawer-face">
                    <i class="drawer-handle" aria-hidden="true"></i>
                    <span class="drawer-label">
                      <b>0{{ idx + 1 }}</b>
                      <span>{{ (item.titleKey | t) | uppercase }}</span>
                    </span>
                    <small>{{ item.drawerCode }}</small>
                  </span>
                </button>
              }
            </div>

            <div class="cabinet-base" aria-hidden="true"><i></i><i></i></div>
          </div>
        </div>

        <aside class="project-dossier" [class.has-project]="activeProject() !== null" id="projectDossier" aria-live="polite">
          @if (!activeProject()) {
            <div class="dossier-empty">
              <span>{{ 'projects.empty' | t }}</span>
              <strong>{{ 'projects.emptyTitle' | t }}</strong>
              <p>{{ 'projects.emptyDesc' | t }}</p>
              <i aria-hidden="true">↙</i>
            </div>
          }

          @if (activeProject(); as proj) {
            <div class="dossier-content">
              <button class="dossier-close" id="dossierClose" type="button" (click)="closeCabinet()">
                {{ 'projects.close' | t }} <span>×</span>
              </button>
              <div class="dossier-sheet dossier-sheet-back" aria-hidden="true"></div>
              <div class="dossier-sheet dossier-sheet-main">
                <div class="dossier-punches" aria-hidden="true"><i></i><i></i><i></i></div>
                <header>
                  <p id="dossierCode">{{ proj.code }}</p>
                  <span id="dossierType">{{ proj.type }}</span>
                </header>
                <figure>
                  <img id="dossierImage" [src]="proj.image" [alt]="proj.alt">
                  <figcaption>{{ 'projects.caption' | t }}</figcaption>
                </figure>
                <h3 id="dossierTitle">{{ proj.titleKey | t }}</h3>
                <p id="dossierDescription">{{ proj.descKey | t }}</p>
                <ul class="tag-list" id="dossierTags" aria-label="Tecnologías">
                  @for (tag of proj.tags; track tag) {
                    <li>{{ tag }}</li>
                  }
                </ul>
                <div class="dossier-footer">
                  <a class="text-link" href="#contacto">{{ 'projects.consult' | t }} <span>→</span></a>
                  <span class="dossier-stamp" id="dossierStatus">{{ (proj.status === 'EN DESARROLLO' ? 'proj.btn.dev' : 'projects.archived') | t }}</span>
                </div>
              </div>
            </div>
          }
        </aside>
      </div>
    </section>
  `
})
export class ProjectsComponent {
  activeProjectId = signal<string | null>(null);
  activeProject = signal<CabinetProject | null>(null);
  private cabinetTimer: any;

  projectList: CabinetProject[] = [
    {
      id: 'anibal',
      code: 'EXPEDIENTE 01',
      type: 'LANDING / ADS',
      titleKey: 'proj.anibal.title',
      subtitleKey: 'srv.core.ads.title',
      descKey: 'proj.anibal.short',
      image: 'assets/projects/anibal.webp',
      alt: 'Anibal Rey de Corazones',
      tags: ['HTML', 'CSS', 'JavaScript', 'Google Ads', 'WhatsApp API'],
      status: 'ARCHIVADO',
      drawerCode: 'A–01'
    },
    {
      id: 'jornada',
      code: 'EXPEDIENTE 02',
      type: 'EVENT / WEB',
      titleKey: 'proj.jornada.title',
      subtitleKey: 'srv.core.web.title',
      descKey: 'proj.jornada.short',
      image: 'assets/projects/jornada-industrial.webp',
      alt: 'Jornada Industrial Coclé',
      tags: ['WordPress', 'PHP', 'MySQL', 'CSS', 'HTML'],
      status: 'ARCHIVADO',
      drawerCode: 'A–02'
    },
    {
      id: 'casa',
      code: 'EXPEDIENTE 03',
      type: 'E-COMMERCE',
      titleKey: 'proj.casa.title',
      subtitleKey: 'srv.core.web.title',
      descKey: 'proj.casa.short',
      image: 'assets/projects/casa-jean.webp',
      alt: 'La Casa del Jean',
      tags: ['Angular', 'TypeScript', 'Tailwind CSS', 'RxJS', 'NgRx / Signals'],
      status: 'ARCHIVADO',
      drawerCode: 'A–03'
    },
    {
      id: 'nextaudit',
      code: 'EXPEDIENTE 04',
      type: 'AI / SECURITY',
      titleKey: 'proj.nextaudit.title',
      subtitleKey: 'srv.core.ai.title',
      descKey: 'proj.nextaudit.short',
      image: 'assets/projects/nextaudit.webp',
      alt: 'NextAudit AI',
      tags: ['Angular', 'RxJS', 'Signals', 'NestJS', 'Node.js'],
      status: 'EN DESARROLLO',
      drawerCode: 'A–04'
    }
  ];

  toggleDrawer(projectId: string): void {
    const isSame = this.activeProjectId() === projectId;
    this.closeCabinet();

    if (isSame) return;

    this.activeProjectId.set(projectId);
    const proj = this.projectList.find(p => p.id === projectId) || null;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.cabinetTimer = setTimeout(() => {
      this.activeProject.set(proj);
      if (window.innerWidth < 1080) {
        const dossierEl = document.getElementById('projectDossier');
        if (dossierEl) {
          dossierEl.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
        }
      }
    }, reducedMotion ? 0 : 780);
  }

  closeCabinet(): void {
    if (this.cabinetTimer) {
      clearTimeout(this.cabinetTimer);
    }
    this.activeProjectId.set(null);
    this.activeProject.set(null);
  }
}
