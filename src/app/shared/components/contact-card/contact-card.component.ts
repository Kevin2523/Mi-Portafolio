import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const EMAILJS_SERVICE_ID = 'service_ak4xprk';
const EMAILJS_TEMPLATE_ID = 'template_o5k4o9j';
const EMAILJS_PUBLIC_KEY = 'ClGvdEq4OxhPd2sL3';

@Component({ selector: 'app-contact-card', standalone: true, imports: [CommonModule, FormsModule], template: `
<section class="contact-reference" id="contact"><aside class="contact-pitch"><p class="eyebrow light">CONTACTO</p><h2>¿En qué te<br>puedo <span>apoyar?</span></h2><p>Construyamos juntos soluciones digitales para convertir tus ideas en resultados reales.</p><div class="contact-email"><span>✉</span><div><strong>kjmg2325@gmail.com</strong><small>Respuesta promedio en menos de 24 horas</small></div></div><div class="contact-social"><a href="https://wa.me/50760326810" target="_blank" rel="noopener noreferrer">◉&nbsp; WhatsApp</a><a href="https://www.linkedin.com/in/kevin-mena-78b230348" target="_blank" rel="noopener noreferrer">in&nbsp;&nbsp; LinkedIn</a></div><p class="contact-script">Hablemos de<br>lo que sigue</p></aside><div class="contact-form-panel"><p class="contact-kicker">¿TIENES UN PROYECTO EN MENTE? HABLEMOS</p><h3>¿En qué te puedo apoyar?</h3><div class="contact-reasons">@for (reason of reasons; track reason.label) { <button type="button" (click)="selectReason(reason.subject)" [class.selected]="subject === reason.subject">{{ reason.label }}</button> }</div>@if (isSent()) { <div class="contact-success">¡Mensaje enviado con éxito! Te responderé pronto.</div> } @else { <form (ngSubmit)="onSubmit()"><div class="contact-fields"><label>Nombre<input type="text" [(ngModel)]="name" name="name" placeholder="Tu nombre" required></label><label>Email<input type="email" [(ngModel)]="email" name="email" placeholder="tu@correo.com" required></label></div><label>Asunto<input type="text" [(ngModel)]="subject" name="subject" placeholder="Asunto del mensaje"></label><label>Mensaje<textarea [(ngModel)]="message" name="message" placeholder="Escribe tu mensaje aquí..." required rows="4"></textarea></label>@if (errorMsg()) { <p class="contact-error">{{ errorMsg() }}</p> }<button class="contact-submit" type="submit" [disabled]="isSending()">{{ isSending() ? 'Enviando...' : 'Enviar mensaje  →' }}</button></form> }</div></section>` })
export class ContactCardComponent {
  name = ''; email = ''; subject = ''; message = '';
  isSending = signal(false); isSent = signal(false); errorMsg = signal('');
  reasons = [{ label: 'Nuevo Proyecto', subject: 'Propuesta de Nuevo Proyecto Web / Software' }, { label: 'Oportunidad Laboral', subject: 'Oportunidad Laboral / Contratación' }, { label: 'Seguridad / IA', subject: 'Consulta sobre Auditoría / Automatización IA' }];
  selectReason(reasonSubject: string): void { this.subject = reasonSubject; }
  async onSubmit(): Promise<void> { if (!this.name || !this.email || !this.message) return; this.isSending.set(true); this.errorMsg.set(''); try { const emailjs = await import('@emailjs/browser'); await emailjs.default.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { from_name: this.name, from_email: this.email, subject: this.subject, message: this.message }, EMAILJS_PUBLIC_KEY); this.isSent.set(true); } catch { this.errorMsg.set('Error al enviar. Intenta de nuevo.'); } finally { this.isSending.set(false); } }
}
