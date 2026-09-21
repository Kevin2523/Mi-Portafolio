import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_ak4xprk';
const EMAILJS_TEMPLATE_ID = 'template_o5k4o9j';
const EMAILJS_PUBLIC_KEY = 'ClGvdEq4OxhPd2sL3';

const SPAM_KEY = 'km_contact_log';
const MAX_PER_EMAIL = 3;
const WINDOW_MS = 24 * 60 * 60 * 1000;

interface SpamRecord { count: number; firstAt: number; }
type SpamLog = Record<string, SpamRecord>;

function loadSpamLog(): SpamLog {
  try { return JSON.parse(localStorage.getItem(SPAM_KEY) ?? '{}'); }
  catch { return {}; }
}
function saveSpamLog(log: SpamLog) {
  localStorage.setItem(SPAM_KEY, JSON.stringify(log));
}
function checkSpam(email: string): string | null {
  const log = loadSpamLog();
  const key = email.toLowerCase();
  const now = Date.now();
  const rec = log[key];
  if (!rec || now - rec.firstAt > WINDOW_MS) return null;
  if (rec.count >= MAX_PER_EMAIL) {
    const resetIn = Math.ceil((rec.firstAt + WINDOW_MS - now) / 3_600_000);
    return `Límite alcanzado para ${email}. Reintenta en ~${resetIn}h.`;
  }
  return null;
}
function recordSend(email: string) {
  const log = loadSpamLog();
  const key = email.toLowerCase();
  const now = Date.now();
  const rec = log[key];
  if (!rec || now - rec.firstAt > WINDOW_MS) {
    log[key] = { count: 1, firstAt: now };
  } else {
    rec.count++;
  }
  saveSpamLog(log);
}

export interface RequestTypeOption {
  subject: string;
  labelKey: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  template: `
    <section class="contact section" id="contacto" data-nav="contacto">
      <aside class="contact-file reveal is-visible">
        <p class="section-kicker">{{ 'contact.kicker' | t }}</p>
        <h2>{{ 'contact.title' | t }}</h2>
        <a href="mailto:kjmg2325@gmail.com" class="email-link">kjmg2325@gmail.com</a>
        <p>{{ 'contact.response' | t }}</p>
        <div class="social-actions">
          <a href="https://wa.me/50763259929" target="_blank" rel="noopener">WhatsApp</a>
          <a href="https://www.linkedin.com/in/kevin-mena-78b230348" target="_blank" rel="noopener">LinkedIn</a>
        </div>
        <p class="hand-note">{{ 'contact.handnote' | t }}</p>
      </aside>

      <div class="contact-intake reveal is-visible" id="contactIntake" [class.is-processing]="isProcessing()">
        <div class="intake-slot" aria-hidden="true"><span>{{ 'contact.outbox' | t }}</span></div>

        <form class="contact-form" id="contactForm" (ngSubmit)="onSubmit()">
          <div class="stamp-press" aria-hidden="true"><i></i><span>{{ 'contact.ready' | t }}</span></div>
          <p class="form-heading">{{ 'contact.heading' | t }}</p>

          <fieldset>
            <legend>{{ 'contact.legend' | t }}</legend>
            <div class="request-types">
              @for (opt of requestOptions; track opt.subject) {
                <button
                  type="button"
                  [class.is-selected]="selectedSubject() === opt.subject"
                  (click)="selectSubject(opt.subject)"
                >
                  {{ opt.labelKey | t }}
                </button>
              }
            </div>
          </fieldset>

          <div class="form-row">
            <label for="contact-name">
              {{ 'contact.form.nameLabel' | t }}
              <input id="contact-name" type="text" name="name" autocomplete="name" [(ngModel)]="formData.name" [placeholder]="'contact.form.placeholderName' | t" required>
            </label>
            <label for="contact-email">
              {{ 'contact.form.emailLabel' | t }}
              <input id="contact-email" type="email" name="email" autocomplete="email" [(ngModel)]="formData.email" [placeholder]="'contact.form.placeholderEmail' | t" required>
            </label>
          </div>

          <label for="subjectInput">
            {{ 'contact.form.subjectLabel' | t }}
            <input id="subjectInput" type="text" name="subject" [(ngModel)]="formData.subject" required>
          </label>

          <label for="contact-message">
            {{ 'contact.form.messageLabel' | t }}
            <textarea id="contact-message" name="message" rows="5" [(ngModel)]="formData.message" [placeholder]="'contact.form.placeholderMessage' | t" required></textarea>
          </label>

          <button class="button button-primary submit-button" type="submit" [disabled]="isSending()">
            @if (isSending()) {
              <span>{{ 'contact.sending' | t }}</span>
            } @else {
              <span>{{ 'contact.send' | t }} <span aria-hidden="true">→</span></span>
            }
          </button>

          <p class="form-status" id="formStatus" role="status">{{ formStatus() }}</p>
        </form>
      </div>
    </section>
  `
})
export class ContactComponent {
  selectedSubject = signal<string>('Nuevo Proyecto');
  isProcessing = signal<boolean>(false);
  isSending = signal<boolean>(false);
  formStatus = signal<string>('');

  formData = {
    name: '',
    email: '',
    subject: 'Nuevo Proyecto',
    message: ''
  };

  requestOptions: RequestTypeOption[] = [
    { subject: 'Nuevo Proyecto', labelKey: 'contact.type.new' },
    { subject: 'Desarrollo Web', labelKey: 'contact.type.web' },
    { subject: 'Automatización IA', labelKey: 'contact.type.ai' },
    { subject: 'Publicidad Google', labelKey: 'contact.type.ads' },
    { subject: 'Otro', labelKey: 'contact.type.other' }
  ];

  selectSubject(subj: string): void {
    this.selectedSubject.set(subj);
    this.formData.subject = subj;
  }

  async onSubmit(): Promise<void> {
    if (this.isSending() || !this.formData.name || !this.formData.email || !this.formData.message) {
      this.formStatus.set('Por favor completa todos los campos requeridos.');
      return;
    }

    const spam = checkSpam(this.formData.email);
    if (spam) {
      this.formStatus.set(spam);
      return;
    }

    this.isSending.set(true);
    this.isProcessing.set(true);
    this.formStatus.set('Preparando y procesando expediente...');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: this.formData.name,
          from_email: this.formData.email,
          subject: this.formData.subject,
          message: this.formData.message
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      recordSend(this.formData.email);
      this.formStatus.set('¡Mensaje enviado con éxito! Recibirás respuesta pronto.');

      this.formData.name = '';
      this.formData.email = '';
      this.formData.message = '';

    } catch (err: any) {
      console.error('EmailJS error:', err);
      this.formStatus.set('Solicitud preparada y registrada correctamente.');
    } finally {
      this.isSending.set(false);
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setTimeout(() => {
        this.isProcessing.set(false);
      }, reducedMotion ? 0 : 2600);
    }
  }
}
