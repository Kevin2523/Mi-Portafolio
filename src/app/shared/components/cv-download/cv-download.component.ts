import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiStateService } from '../../../core/services/ui-state.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

let pdfMake: any;
let pdfFonts: any;

@Component({
  selector: 'app-cv-download',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <button
      type="button"
      (click)="downloadCV()"
      [disabled]="isGenerating()"
      class="button button-secondary"
      [class.opacity-50]="isGenerating()"
      [class.cursor-not-allowed]="isGenerating()"
    >
      @if (isGenerating()) {
        <span>{{ 'cv.generating' | t }}</span>
      } @else {
        <span>{{ 'cv.download' | t }} <span aria-hidden="true">↓</span></span>
      }
    </button>
  `
})
export class CvDownloadComponent {
  private uiState = inject(UiStateService);
  readonly isGenerating = signal(false);
  private pdfMakeLoaded = false;

  private async loadPdfMake(): Promise<void> {
    if (this.pdfMakeLoaded) return;
    
    const pdfMakeModule = await import('pdfmake/build/pdfmake');
    const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
    
    pdfMake = pdfMakeModule.default;
    pdfFonts = pdfFontsModule.default;
    
    pdfMake.vfs = pdfFonts;
    this.pdfMakeLoaded = true;
  }

  async downloadCV(): Promise<void> {
    this.isGenerating.set(true);
    try {
      await this.loadPdfMake();
      const doc = pdfMake.createPdf(this.doc());
      doc.open();
    } catch (e) { 
      console.error('Error generating CV:', e); 
    } finally { 
      this.isGenerating.set(false); 
    }
  }

  private doc(): any {
    const BLACK = '#000000';
    const DARK_GRAY = '#333333';
    const MEDIUM_GRAY = '#666666';
    const LIGHT_GRAY = '#999999';

    return {
      pageSize: 'LETTER',
      pageMargins: [40, 40, 40, 40],
      defaultStyle: {
        font: 'Roboto',
        fontSize: 9,
        color: DARK_GRAY,
        lineHeight: 1.15
      },
      content: [
        {
          text: 'KEVIN JHAIR MENA GOODING',
          style: 'name',
          alignment: 'center',
          margin: [0, 0, 0, 4]
        },
        {
          text: [
            'Panamá',
            { text: '  •  ', color: LIGHT_GRAY },
            'kjmg2325@gmail.com',
            { text: '  •  ', color: LIGHT_GRAY },
            '+507 6032-6810',
            { text: '  •  ', color: LIGHT_GRAY },
            'linkedin.com/in/kevin-mena-78b230348',
            { text: '  •  ', color: LIGHT_GRAY },
            'github.com/Kevin2523'
          ],
          style: 'contact',
          alignment: 'center',
          margin: [0, 0, 0, 8]
        },

        { text: 'PERFIL', style: 'section' },
        {
          text: 'Full-Stack Developer con enfoque en resultados. Desarrollo web, e-commerce y publicidad digital para negocios que quieren vender más en internet. Combino código moderno con estrategia de conversión.',
          style: 'bullet',
          margin: [0, 0, 0, 6]
        },

        { text: 'PROYECTOS DESTACADOS', style: 'section' },

        this.projectEntry(
          'Anibal Rey de Corazones — Landing Page + Google Ads',
          [
            'Landing page de alta conversión para guía espiritual profesional en Panamá.',
            'Gestión completa de campañas Google Ads con seguimiento de conversiones vía WhatsApp.',
            'Resultado: flujo constante de clientes desde Google directo al WhatsApp del negocio.'
          ]
        ),

        this.projectEntry(
          'La Casa del Jean — Tienda E-commerce',
          [
            'Tienda en línea con Angular + PHP + MySQL: catálogo 200+ productos, carrito persistente, checkout.',
            'Panel de administración para control de inventario, pedidos y clientes.'
          ]
        ),

        this.projectEntry(
          'NextAudit AI — Sistema de Auditorías con IA',
          [
            'Plataforma SaaS para auditorías automatizadas utilizando Angular + NestJS + PostgreSQL.',
            'Integración de autenticación biométrica (WebAuthn) y despliegue con Docker + GitHub Actions.'
          ]
        ),

        this.projectEntry(
          'Jornada Industrial — Sitio Web Institucional',
          [
            'Sitio web oficial para la Jornada Industrial de UTP Coclé con WordPress.',
            'Plataforma informativa con agenda dinámica, perfiles de ponentes y registro de participantes.'
          ]
        ),

        { text: 'EXPERIENCIA PROFESIONAL', style: 'section' },

        this.expEntry(
          'Desarrollador Web y Publicidad Digital',
          'Independiente',
          'Panamá',
          '2026 – Presente',
          [
            'Desarrollo de páginas web para negocios locales combinado con campañas de Google Ads.',
            'Seguimiento de estadísticas y optimización continua para mejorar ventas de cada cliente.',
            'Gestión completa: desde la recolección de requerimientos hasta el despliegue y marketing.'
          ]
        ),

        this.expEntry(
          'Práctica Profesional — Seguridad e IA',
          'Rosero One',
          'Panamá',
          '2026',
          [
            'Práctica profesional aplicando ciberseguridad e inteligencia artificial en entorno laboral real.',
            'Auditorías, monitoreo y herramientas de seguridad informática.'
          ]
        ),

        { text: 'HABILIDADES TÉCNICAS', style: 'section' },
        {
          columns: [
            {
              width: '*',
              stack: [
                this.skillCategory('Frontend', 'Angular, Tailwind CSS, TypeScript, HTML5, CSS3, JavaScript'),
                this.skillCategory('Backend', 'NestJS, PHP, MySQL, Node.js, REST APIs'),
                this.skillCategory('Herramientas', 'Git/GitHub, Docker, Linux, VS Code')
              ]
            },
            {
              width: '*',
              stack: [
                this.skillCategory('Marketing', 'Google Ads, Google Analytics, SEO, Copywriting'),
                this.skillCategory('Seguridad', 'OWASP, NIST, Trivy, SonarQube, WebAuthn'),
                this.skillCategory('Idiomas', 'Español (nativo), Inglés (intermedio)')
              ]
            }
          ],
          margin: [0, 2, 0, 6]
        },

        { text: 'EDUCACIÓN', style: 'section' },
        this.eduEntry(
          'Universidad Tecnológica de Panamá',
          'Panamá',
          'Licenciatura en Desarrollo y Gestión de Software',
          '2023 – 2026'
        ),
      ],
      styles: {
        name: { fontSize: 16, bold: true, color: BLACK },
        contact: { fontSize: 8, color: MEDIUM_GRAY },
        section: { fontSize: 10, bold: true, color: BLACK, margin: [0, 6, 0, 3], decoration: 'underline' },
        jobTitle: { fontSize: 9, bold: true, color: DARK_GRAY },
        company: { fontSize: 9, italics: true, color: MEDIUM_GRAY },
        date: { fontSize: 8, color: LIGHT_GRAY },
        bullet: { fontSize: 8, color: DARK_GRAY, margin: [0, 1, 0, 1] },
        categoryTitle: { fontSize: 8, bold: true, color: DARK_GRAY },
        categoryContent: { fontSize: 8, color: MEDIUM_GRAY, margin: [0, 0, 0, 3] }
      }
    };
  }

  private eduEntry(school: string, location: string, degree: string, dates: string): any {
    return {
      columns: [
        { width: '*', stack: [{ text: school, style: 'jobTitle' }, { text: degree, style: 'company', margin: [0, 1, 0, 0] }] },
        { width: 'auto', stack: [{ text: location, style: 'date', alignment: 'right' }, { text: dates, style: 'date', alignment: 'right', margin: [0, 1, 0, 0] }] }
      ],
      margin: [0, 0, 0, 3]
    };
  }

  private expEntry(title: string, company: string, location: string, dates: string, bullets: string[]): any {
    return {
      columns: [
        {
          width: '*',
          stack: [
            { text: title, style: 'jobTitle' },
            { text: company, style: 'company', margin: [0, 1, 0, 0] },
            ...bullets.map(b => ({ text: [{ text: '• ', fontSize: 8 }, { text: b, style: 'bullet' }], margin: [10, 1, 0, 0] }))
          ]
        },
        {
          width: 'auto',
          stack: [
            { text: location, style: 'date', alignment: 'right' },
            { text: dates, style: 'date', alignment: 'right', margin: [0, 1, 0, 0] }
          ]
        }
      ],
      margin: [0, 0, 0, 4]
    };
  }

  private projectEntry(title: string, bullets: string[]): any {
    return {
      stack: [
        { text: title, style: 'jobTitle', margin: [0, 0, 0, 1] },
        ...bullets.map(b => ({ text: [{ text: '• ', fontSize: 8 }, { text: b, style: 'bullet' }], margin: [10, 1, 0, 0] }))
      ],
      margin: [0, 0, 0, 3]
    };
  }

  private skillCategory(title: string, content: string): any {
    return {
      stack: [
        { text: title + ': ', style: 'categoryTitle' },
        { text: content, style: 'categoryContent' }
      ]
    };
  }
}
