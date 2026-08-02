import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { Project, KEVIN_PROJECTS } from '../../core/models/project.model';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  template: `
    <section class="py-24 px-6 w-full max-w-6xl mx-auto relative z-10" id="projects">
      <div class="mb-12">
        <h2 class="text-3xl md:text-4xl font-bold font-display">
          Proyectos
        </h2>
        <div class="h-[2px] w-24 bg-gradient-to-r from-indigo-400 via-purple-400 to-transparent dark:from-indigo-400 dark:via-purple-400 to-transparent mt-4"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        @for (project of projects; track project.id) {
          <div [ngClass]="project.bentoClass || ''" class="h-full">
            <app-project-card [project]="project" class="h-full block"></app-project-card>
          </div>
        }
      </div>
    </section>
  `
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = KEVIN_PROJECTS; // ← carga sincrónica inmediata
  private http = inject(HttpClient);

  ngOnInit() {
    // Intenta obtener datos remotos, pero los locales ya se muestran
    this.http.get<Project[]>('http://localhost:3000/api/projects').pipe(
      catchError((error) => {
        console.warn('Fleet backend no disponible. Usando datos locales.', error);
        return of(KEVIN_PROJECTS);
      })
    ).subscribe((data) => {
      this.projects = data;
    });
  }
}
