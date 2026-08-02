import { Routes } from '@angular/router';

/**
 * app.routes.ts — Kevin Mena Portfolio
 *
 * Arquitectura:
 *   ''  →  Shell (layout raíz con nav + footer)
 *          ├─ ''          →  HomeComponent    (eager: es el punto de entrada)
 *          ├─ experiencia →  ExperienceComponent  (lazy)
 *          └─ proyectos   →  ProjectsComponent    (lazy)
 *
 * El wildcard redirige siempre al home.
 */
export const routes: Routes = [
  {
    // Shell raíz: carga del AppShell si se quiere extraer nav/footer aquí.
    // Por ahora el layout vive en AppComponent, así que usamos path vacío
    // con hijos directos para mantener la SPA en una sola salida de router.
    path: '',
    children: [
      {
        // ── Home (eager load: es el primer render, no debe diferirse) ─────────
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/home/home.component').then(m => m.HomeComponent),
        title: 'Kevin Mena — Full-Stack & AI Security'
      },

      // ── Secciones con Lazy Loading ─────────────────────────────────────────
      {
        path: 'experiencia',
        loadComponent: () =>
          import('./features/experience/experience.component').then(
            m => m.ExperienceComponent
          ),
        title: 'Trayectoria — Kevin Mena'
      },
      {
        path: 'proyectos',
        loadComponent: () =>
          import('./features/projects/projects.component').then(
            m => m.ProjectsComponent
          ),
        title: 'Proyectos — Kevin Mena'
      },

      // ── Routes futuras (comentadas, listas para activarse) ─────────────────
      // {
      //   path: 'habilidades',
      //   loadComponent: () =>
      //     import('./features/skills/skills.component').then(m => m.SkillsComponent),
      //   title: 'Stack — Kevin Mena'
      // },
      // {
      //   path: 'contacto',
      //   loadComponent: () =>
      //     import('./features/contact/contact.component').then(m => m.ContactComponent),
      //   title: 'Contacto — Kevin Mena'
      // }
    ]
  },

  // ── Wildcard: cualquier ruta desconocida vuelve al home ───────────────────
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
