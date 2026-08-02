import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TechIconService {
  private readonly icons: Record<string, string> = {
    // ========== FRONTEND (6) ==========
    'Angular': `<svg viewBox="0 0 24 24" fill="#DD0031"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5L6.5 6.2 12 8.3 17.5 6.2 12 4.1zM4 8.8l7 3.5v7.4l-7-3.5V8.8zm10 10.9v-7.4l7-3.5v7.4l-7 3.5z"/></svg>`,
    'TypeScript': `<svg viewBox="0 0 24 24" fill="#3178C6"><path d="M4 5h7v14H4V5zm6 0v14h7V5h-7zm6 0v14h7V5h-7z"/></svg>`,
    'Tailwind CSS': `<svg viewBox="0 0 24 24" fill="#06B6D4"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L6.18 5.82 12 8.64 17.82 5.82 12 2.18zM4 8.82l7 3.53v7.06l-7-3.53V8.82zm10 10.59V15.8l7-3.53v7.06l-7 3.53z"/></svg>`,
    'React': `<svg viewBox="0 0 24 24" fill="#61DAFB"><circle cx="12" cy="12" r="10"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`,
    'RxJS': `<svg viewBox="0 0 24 24" fill="#B7178C"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.52 14H6.48c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1h11.04c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1z"/></svg>`,
    'Signals': `<svg viewBox="0 0 24 24" fill="#B7178C"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.27z"/></svg>`,

    // ========== BACKEND (5) ==========
    'NestJS': `<svg viewBox="0 0 24 24" fill="#E0234E"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
    'Node.js': `<svg viewBox="0 0 24 24" fill="#339933"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-3h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.27z"/></svg>`,
    'PostgreSQL': `<svg viewBox="0 0 24 24" fill="#336791"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 16H7v-2h10v2zm0-4H7v-2h10v2zM7 12v-2h10v2H7z"/></svg>`,
    'Prisma': `<svg viewBox="0 0 24 24" fill="#2D3748"><path d="M12 2L2 7l10 5 10-5-10-5zm0 15l10-5L12 2 2 7l10 5zm0-10l10 5L12 22l-10-5z"/></svg>`,
    'Docker': `<svg viewBox="0 0 24 24" fill="#2496ED"><path d="M20 6H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>`,

    // ========== LENGUAJES (5) ==========
    'C#': `<svg viewBox="0 0 24 24" fill="#239120"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,
    '.NET': `<svg viewBox="0 0 24 24" fill="#512BD4"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,
    'Python': `<svg viewBox="0 0 24 24" fill="#3776AB"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,
    'PHP': `<svg viewBox="0 0 24 24" fill="#777BB4"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,
    'Java': `<svg viewBox="0 0 24 24" fill="#ED8B00"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,

    // ========== IA/AUTOMATIZACIÓN (4) ==========
    'n8n': `<svg viewBox="0 0 24 24" fill="#EA4B84"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,
    'Flowise': `<svg viewBox="0 0 24 24" fill="#00D4AA"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,
    'Ollama': `<svg viewBox="0 0 24 24" fill="#000000"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,
    'IA/LLM': `<svg viewBox="0 0 24 24" fill="#8B5CF6"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,

    // ========== MARKETING (4) ==========
    'Google Ads': `<svg viewBox="0 0 24 24" fill="#4285F4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-3h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.27z"/></svg>`,
    'Google Analytics': `<svg viewBox="0 0 24 24" fill="#F9AB00"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-3h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.27z"/></svg>`,
    'Google Maps': `<svg viewBox="0 0 24 24" fill="#34A853"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-3h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.27z"/></svg>`,
    'Looker Studio': `<svg viewBox="0 0 24 24" fill="#4285F4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-3h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.27z"/></svg>`,

    // ========== SEGURIDAD (3) ==========
    'SonarQube': `<svg viewBox="0 0 24 24" fill="#4E9BCD"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,
    'Trivy': `<svg viewBox="0 0 24 24" fill="#19A979"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,
    'OWASP ZAP': `<svg viewBox="0 0 24 24" fill="#E03E2D"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,

    // ========== DEVOPS (4) ==========
    'GitHub Actions': `<svg viewBox="0 0 24 24" fill="#2088FF"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-3h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.27z"/></svg>`,
    'WordPress': `<svg viewBox="0 0 24 24" fill="#21759B"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,
    'Lazy Blocks': `<svg viewBox="0 0 24 24" fill="#000"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,
    'Gutenberg': `<svg viewBox="0 0 24 24" fill="#000"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,

    // ========== WEB MODERNA (4) ==========
    'SSG/Prerender': `<svg viewBox="0 0 24 24" fill="#000"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,
    'JAMstack': `<svg viewBox="0 0 24 24" fill="#F0047F"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,
    'WCAG AA': `<svg viewBox="0 0 24 24" fill="#005A9C"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,
    'Lighthouse': `<svg viewBox="0 0 24 24" fill="#F4B400"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,

    // ========== BASES DE DATOS (2) ==========
    'MySQL': `<svg viewBox="0 0 24 24" fill="#4479A1"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 16H7v-2h10v2zm0-4H7v-2h10v2zM7 12v-2h10v2H7z"/></svg>`,
    'MongoDB': `<svg viewBox="0 0 24 24" fill="#47A248"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 16H7v-2h10v2zm0-4H7v-2h10v2zM7 12v-2h10v2H7z"/></svg>`,

    // ========== DATA/BI (3) ==========
    'PowerBI': `<svg viewBox="0 0 24 24" fill="#F2C811"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,
    'LookerStudio': `<svg viewBox="0 0 24 24" fill="#4285F4"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,
    'Chartjs': `<svg viewBox="0 0 24 24" fill="#FF6384"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,

    // ========== OTROS (3) ==========
    'WhatsApp': `<svg viewBox="0 0 24 24" fill="#25D366"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-3h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.27z"/></svg>`,
    'EmailJS': `<svg viewBox="0 0 24 24" fill="#EA4335"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`,

    // ========== DEFAULT ==========
    'default': `<svg viewBox="0 0 24 24" fill="#64748B"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5-10-5-10 5z"/></svg>`
  };

  getIcon(tech: string): string {
    const key = Object.keys(this.icons).find(k => 
      tech.toLowerCase().includes(k.toLowerCase())
    );
    return this.icons[key || 'default'];
  }

  getIconByExact(tech: string): string {
    return this.icons[tech] || this.icons['default'];
  }
}