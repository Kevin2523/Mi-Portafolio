import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent), title: 'Kevin Mena — Inicio' },
  { path: 'sobre-mi', redirectTo: '' },
  { path: 'proyectos', loadComponent: () => import('./features/pages/section-pages.component').then(m => m.ProjectsPageComponent), title: 'Proyectos — Kevin Mena' },
  { path: 'servicios', loadComponent: () => import('./features/pages/section-pages.component').then(m => m.ServicesPageComponent), title: 'Servicios — Kevin Mena' },
  { path: 'experiencia', loadComponent: () => import('./features/pages/section-pages.component').then(m => m.ExperiencePageComponent), title: 'Experiencia — Kevin Mena' },
  { path: 'habilidades', loadComponent: () => import('./features/pages/section-pages.component').then(m => m.SkillsPageComponent), title: 'Habilidades — Kevin Mena' },
  { path: 'contacto', loadComponent: () => import('./features/pages/section-pages.component').then(m => m.ContactPageComponent), title: 'Contacto — Kevin Mena' },
  { path: '**', redirectTo: '' }
];
