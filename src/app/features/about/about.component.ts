import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="about section paper-section" id="sobre-mi" data-nav="sobre-mi" #aboutSection [class.is-active]="isActive">
      <div class="profile-envelope" id="profileEnvelope" aria-hidden="true">
        <div class="envelope-back"></div>
        <div class="envelope-letter">PERFIL / KM</div>
        <div class="envelope-front"></div>
        <div class="envelope-flap"></div>
      </div>

      <div class="paper-sheet reveal is-visible">
        <p class="section-kicker">ARCHIVO 05 / SOBRE MÍ</p>
        <h2>Un desarrollador que cree en el poder de la tecnología para crear oportunidades.</h2>
        <p>Soy Kevin Mena, desarrollador full-stack de Panamá. Me apasiona crear productos digitales que combinen software, inteligencia artificial, seguridad y estrategia de negocio. Siempre estoy aprendiendo, construyendo y buscando formas de generar un impacto real desde la tecnología.</p>
        <span class="corner-fold" aria-hidden="true"></span>
      </div>

      <div class="index-cards reveal is-visible" aria-label="Datos sobre Kevin">
        <div class="index-card">
          <span>UBICACIÓN</span>
          <strong>San Carlos, Panamá</strong>
        </div>
        <div class="index-card">
          <span>ÁREA 01</span>
          <strong>Desarrollo full-stack</strong>
        </div>
        <div class="index-card">
          <span>ÁREA 02</span>
          <strong>IA y ciberseguridad</strong>
        </div>
        <div class="index-card">
          <span>ÁREA 03</span>
          <strong>Productos digitales</strong>
        </div>
        <div class="index-card">
          <span>ENFOQUE</span>
          <strong>Ideas en acción</strong>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent implements OnInit {
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  isActive = false;

  ngOnInit(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isActive = true;
            observer.disconnect();
          }
        });
      }, { threshold: 0.28 });

      setTimeout(() => {
        if (this.aboutSection?.nativeElement) {
          observer.observe(this.aboutSection.nativeElement);
        }
      }, 100);
    } else {
      this.isActive = true;
    }
  }
}
