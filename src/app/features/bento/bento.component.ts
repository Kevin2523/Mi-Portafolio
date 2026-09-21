import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ServicesComponent } from '../services/services.component';
import { ProcessComponent } from '../process/process.component';
import { ExperienceComponent } from '../experience/experience.component';
import { SkillsComponent } from '../skills/skills.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-bento',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    ProjectsComponent,
    ServicesComponent,
    ProcessComponent,
    ExperienceComponent,
    SkillsComponent,
    ContactComponent
  ],
  template: `
    <div class="portfolio-page">
      <app-hero></app-hero>
      <app-projects></app-projects>
      <app-services></app-services>
      <app-process></app-process>
      <app-experience></app-experience>
      <app-skills></app-skills>
      <app-contact></app-contact>
    </div>
  `
})
export class BentoComponent {}
