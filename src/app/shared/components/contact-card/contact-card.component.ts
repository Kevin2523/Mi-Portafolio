import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

const EMAILJS_SERVICE_ID = 'service_ak4xprk';
const EMAILJS_TEMPLATE_ID = 'template_o5k4o9j';
const EMAILJS_PUBLIC_KEY = 'ClGvdEq4OxhPd2sL3';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  template: `
    <div class="p-5 sm:p-7 md:p-9 h-full flex flex-col justify-between" id="contact">
      <div>
        <!-- Title row with inline email copy -->
        <div class="flex flex-wrap items-center gap-3 mb-2">
          <h3 class="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">{{ 'contact.title' | t }}</h3>
          
          <!-- One-click copy email button inline -->
          <button 
            type="button"
            (click)="copyEmail()"
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 text-xs font-mono text-slate-700 dark:text-slate-300 hover:border-amber-500/40 hover:text-amber-600 dark:hover:text-amber-400 active:scale-95 transition-all cursor-pointer shadow-xs"
            title="Copiar email"
          >
            <svg class="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span>{{ copiedEmail() ? 'Copiado!' : 'kjmg2325@gmail.com' }}</span>
          </button>
        </div>

        <p class="font-mono text-[10px] tracking-[0.2em] text-amber-500 uppercase font-semibold mb-3">{{ 'contact.subtitle' | t }}</p>

        <!-- Quick Reason Selector Chips -->
        <div class="mb-4">
          <p class="text-xs font-mono text-slate-400 dark:text-slate-500 mb-2">¿En qué te puedo apoyar?</p>
          <div class="flex flex-wrap gap-2">
            @for (reason of reasons; track reason.label) {
              <button 
                type="button"
                (click)="selectReason(reason.subject)"
                [class.border-amber-500]="subject === reason.subject"
                [class.bg-amber-500/10]="subject === reason.subject"
                [class.text-amber-600]="subject === reason.subject"
                [class.dark:text-amber-400]="subject === reason.subject"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-xs font-medium text-slate-600 dark:text-slate-400 hover:border-amber-500/40 hover:text-amber-600 dark:hover:text-amber-400 active:scale-95 transition-all cursor-pointer"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  @if (reason.icon === 'rocket') {
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  } @else if (reason.icon === 'briefcase') {
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  } @else if (reason.icon === 'shield') {
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  }
                </svg>
                {{ reason.label }}
              </button>
            }
          </div>
        </div>
      </div>

      @if (isSent()) {
        <div class="py-8 text-center flex flex-col items-center justify-center">
          <div class="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3 animate-scale-in">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h4 class="font-bold text-lg text-slate-900 dark:text-white mb-1">¡Mensaje Enviado con Éxito!</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 max-w-sm">{{ 'contact.form.success' | t }}</p>
        </div>
      } @else {
        <form (ngSubmit)="onSubmit()" class="flex flex-col gap-3">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-mono text-slate-400 dark:text-slate-500">Nombre</label>
              <input type="text" [(ngModel)]="name" name="name" [placeholder]="'contact.form.placeholderName' | t" required
                     class="w-full bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all">
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-mono text-slate-400 dark:text-slate-500">Email</label>
              <input type="email" [(ngModel)]="email" name="email" [placeholder]="'contact.form.placeholderEmail' | t" required
                     class="w-full bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all">
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-[11px] font-mono text-slate-400 dark:text-slate-500">Asunto</label>
            <input type="text" [(ngModel)]="subject" name="subject" [placeholder]="'contact.form.placeholderSubject' | t"
                   class="w-full bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all">
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-[11px] font-mono text-slate-400 dark:text-slate-500">Mensaje</label>
            <textarea [(ngModel)]="message" name="message" [placeholder]="'contact.form.placeholderMessage' | t" required rows="3"
                      class="w-full bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all resize-none"></textarea>
          </div>

          @if (errorMsg()) {
            <p class="text-xs text-red-500 font-medium">{{ errorMsg() }}</p>
          }

          <button type="submit" [disabled]="isSending()"
                  class="w-full mt-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-[0.99] text-white rounded-xl px-5 py-3 text-sm font-semibold tracking-wide shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            @if (isSending()) {
              <span class="flex items-center justify-center gap-2">
                <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                {{ 'contact.form.sending' | t }}
              </span>
            } @else {
              {{ 'contact.form.submit' | t }}
            }
          </button>
        </form>
      }

      <!-- Contact Links & Response time Footer -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80">
        <span class="inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 text-center sm:text-left">
          <svg class="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          Respuesta promedio en menos de 24 horas
        </span>
        
        <div class="flex items-center gap-3">
          <a href="https://wa.me/50760326810" target="_blank" rel="noopener noreferrer" 
             class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-500 hover:border-emerald-500/40 transition-all shadow-2xs" aria-label="WhatsApp">
            <svg class="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <span>WhatsApp</span>
          </a>

          <a href="https://www.linkedin.com/in/kevin-mena-78b230348" target="_blank" rel="noopener noreferrer"
             class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-sky-500 hover:border-sky-500/40 transition-all shadow-2xs" aria-label="LinkedIn">
            <svg class="w-3.5 h-3.5 text-sky-500" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  `
})
export class ContactCardComponent {
  name = '';
  email = '';
  subject = '';
  message = '';

  isSending = signal(false);
  isSent = signal(false);
  errorMsg = signal('');
  copiedEmail = signal(false);

  reasons = [
    { label: 'Nuevo Proyecto', subject: 'Propuesta de Nuevo Proyecto Web / Software', icon: 'rocket' },
    { label: 'Oportunidad Laboral', subject: 'Oportunidad Laboral / Contratación', icon: 'briefcase' },
    { label: 'Seguridad / IA', subject: 'Consulta sobre Auditoría / Automatización IA', icon: 'shield' }
  ];

  selectReason(reasonSubject: string): void {
    this.subject = reasonSubject;
  }

  copyEmail(): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('kjmg2325@gmail.com');
      this.copiedEmail.set(true);
      setTimeout(() => this.copiedEmail.set(false), 3000);
    }
  }

  async onSubmit(): Promise<void> {
    if (!this.name || !this.email || !this.message) return;
    this.isSending.set(true);
    this.errorMsg.set('');

    try {
      const emailjs = await import('@emailjs/browser');
      await emailjs.default.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: this.name,
          from_email: this.email,
          subject: this.subject,
          message: this.message
        },
        EMAILJS_PUBLIC_KEY
      );
      this.isSent.set(true);
    } catch (e) {
      console.error('EmailJS error:', e);
      this.errorMsg.set('Error al enviar. Intenta de nuevo.');
    } finally {
      this.isSending.set(false);
    }
  }
}


