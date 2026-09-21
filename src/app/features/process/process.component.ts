import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <section class="process section" id="proceso">
      <header class="section-heading reveal is-visible">
        <div>
          <p class="section-kicker">{{ 'process.kicker' | t }}</p>
          <h2>{{ 'process.title' | t }}</h2>
          <p>{{ 'process.subtitle' | t }}</p>
        </div>
      </header>

      <div class="process-track" id="processTrack" #processTrack [class.is-visible]="isVisible">
        <div class="document-cart" aria-hidden="true"><span>{{ 'process.cart' | t }}</span></div>
        <div class="track-line" aria-hidden="true"><span></span></div>

        <article class="process-file reveal is-visible">
          <b>01</b>
          <h3>{{ 'process.1.title' | t }}</h3>
          <p>{{ 'process.1.desc' | t }}</p>
          <span class="approval-stamp">{{ 'process.stamp' | t }}</span>
        </article>

        <article class="process-file reveal is-visible">
          <b>02</b>
          <h3>{{ 'process.2.title' | t }}</h3>
          <p>{{ 'process.2.desc' | t }}</p>
          <span class="approval-stamp">{{ 'process.stamp' | t }}</span>
        </article>

        <article class="process-file reveal is-visible">
          <b>03</b>
          <h3>{{ 'process.3.title' | t }}</h3>
          <p>{{ 'process.3.desc' | t }}</p>
          <span class="approval-stamp">{{ 'process.stamp' | t }}</span>
        </article>

        <article class="process-file reveal is-visible">
          <b>04</b>
          <h3>{{ 'process.4.title' | t }}</h3>
          <p>{{ 'process.4.desc' | t }}</p>
          <span class="approval-stamp">{{ 'process.stamp' | t }}</span>
        </article>
      </div>
    </section>
  `
})
export class ProcessComponent implements OnInit {
  @ViewChild('processTrack') processTrack!: ElementRef;
  isVisible = false;

  ngOnInit(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          observer.disconnect();
        }
      }, { threshold: 0.15 });

      setTimeout(() => {
        if (this.processTrack?.nativeElement) {
          observer.observe(this.processTrack.nativeElement);
        }
      }, 50);
    } else {
      this.isVisible = true;
    }
  }
}
