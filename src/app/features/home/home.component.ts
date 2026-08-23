import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BentoComponent } from '../bento/bento.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BentoComponent],
  template: `
    <app-bento></app-bento>
  `
})
export class HomeComponent {}
