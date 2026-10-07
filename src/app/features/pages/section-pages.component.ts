import { Component } from '@angular/core';
import { ProjectsComponent } from '../projects/projects.component';
import { ServicesComponent } from '../services/services.component';
import { ProcessComponent } from '../process/process.component';
import { ExperienceComponent } from '../experience/experience.component';
import { SkillsComponent } from '../skills/skills.component';
import { ContactComponent } from '../contact/contact.component';

@Component({ selector: 'app-projects-page', standalone: true, imports: [ProjectsComponent], template: '<div class="page-view"><app-projects></app-projects></div>' })
export class ProjectsPageComponent {}

@Component({ selector: 'app-services-page', standalone: true, imports: [ServicesComponent, ProcessComponent], template: '<div class="page-view"><app-services></app-services><app-process></app-process></div>' })
export class ServicesPageComponent {}

@Component({ selector: 'app-experience-page', standalone: true, imports: [ExperienceComponent], template: '<div class="page-view"><app-experience></app-experience></div>' })
export class ExperiencePageComponent {}

@Component({ selector: 'app-skills-page', standalone: true, imports: [SkillsComponent], template: '<div class="page-view"><app-skills></app-skills></div>' })
export class SkillsPageComponent {}

@Component({ selector: 'app-contact-page', standalone: true, imports: [ContactComponent], template: '<div class="page-view"><app-contact></app-contact></div>' })
export class ContactPageComponent {}
