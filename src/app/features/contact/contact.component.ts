import {
  Component,
  signal,
  computed,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewChecked
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import emailjs from '@emailjs/browser';

// ─── Configuración EmailJS ────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = 'service_ak4xprk';
const EMAILJS_TEMPLATE_ID = 'template_o5k4o9j';
const EMAILJS_PUBLIC_KEY = 'ClGvdEq4OxhPd2sL3';

// ─── Anti-Spam ────────────────────────────────────────────────────────────────
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
    return `SPAM_GUARD: Límite alcanzado para ${email}. Reintenta en ~${resetIn}h.`;
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

type TerminalStatus = 'idle' | 'sending' | 'success' | 'error' | 'spam';

interface TerminalLine {
  text: string;
  color: 'default' | 'cyan' | 'green' | 'red' | 'yellow' | 'dim';
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, NgClass],
  styles: [`
    .terminal-body { scroll-behavior: smooth; }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    .cursor { animation: blink 1s step-end infinite; }

    .cyber-input {
      border-radius: 8px;
      font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
      font-size: 13px;
      padding: 12px 16px;
      width: 100%;
      transition: border-color 0.2s, box-shadow 0.2s;
      outline: none;
    }
    :host-context(.dark) .cyber-input {
      background: rgb(15 23 42 / 0.8);
      border: 1px solid rgb(51 65 85 / 0.8);
      color: #e2e8f0;
    }
    :host-context(.dark) .cyber-input:focus {
      border-color: rgb(34 211 238 / 0.6);
      box-shadow: 0 0 0 3px rgb(34 211 238 / 0.08);
    }
    :host-context(.dark) .cyber-input::placeholder { color: rgb(100 116 139 / 0.8); }
    :host-context:not(.dark) .cyber-input {
      background: rgb(248 250 252);
      border: 1px solid rgb(226 232 240);
      color: #1e293b;
    }
    :host-context:not(.dark) .cyber-input:focus {
      border-color: rgb(99 102 241 / 0.6);
      box-shadow: 0 0 0 3px rgb(99 102 241 / 0.08);
    }
    :host-context:not(.dark) .cyber-input::placeholder { color: rgb(148 163 184); }

    .send-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 28px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }
    :host-context(.dark) .send-btn {
      border: 1px solid rgb(34 211 238 / 0.4);
      background: rgb(34 211 238 / 0.1);
      color: #22d3ee;
    }
    :host-context(.dark) .send-btn:hover:not(:disabled) {
      background: rgb(34 211 238 / 0.2);
      border-color: #22d3ee;
      box-shadow: 0 0 20px rgb(34 211 238 / 0.15);
    }
    :host-context(.dark) .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    :host-context:not(.dark) .send-btn {
      border: 1px solid rgb(99 102 241 / 0.4);
      background: rgb(99 102 241 / 0.08);
      color: #6366f1;
    }
    :host-context:not(.dark) .send-btn:hover:not(:disabled) {
      background: rgb(99 102 241 / 0.15);
      border-color: #6366f1;
      box-shadow: 0 0 20px rgb(99 102 241 / 0.12);
    }
    :host-context:not(.dark) .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }

    .line-cyan    { color: #22d3ee; }
    :host-context:not(.dark) .line-cyan { color: #6366f1; }
    .line-green   { color: #4ade80; }
    :host-context:not(.dark) .line-green { color: #059669; }
    .line-red     { color: #f87171; }
    .line-yellow  { color: #facc15; }
    :host-context:not(.dark) .line-yellow { color: #ca8a04; }
    .line-dim     { color: #475569; }
    :host-context:not(.dark) .line-dim { color: #94a3b8; }
    .line-default { color: #94a3b8; }
    :host-context:not(.dark) .line-default { color: #475569; }
  `],
  template: `
    <section class="py-24 px-6 w-full max-w-6xl mx-auto relative z-10" id="contact">
      <div class="mb-12">
        <h2 class="text-3xl md:text-4xl font-bold font-display">
          Contacto
        </h2>
        <div class="h-[2px] w-24 bg-gradient-to-r from-indigo-400 via-purple-400 to-transparent dark:from-indigo-400 dark:via-purple-400 to-transparent mt-4"></div>
      </div>

      <div class="flex flex-col lg:flex-row gap-10">

        <!-- Terminal / Form -->
        <div class="flex-1">
          <div class="rounded-2xl bg-white dark:bg-[#080c14] border border-slate-200 dark:border-slate-800/60 shadow-sm shadow-indigo-200/20 dark:shadow-[0_0_40px_rgba(34,211,238,0.04)] overflow-hidden">

            <!-- Terminal top bar -->
            <div class="px-4 py-2.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-red-400/80 dark:bg-red-500/80 border"></div>
              <div class="w-3 h-3 rounded-full bg-amber-400/80 dark:bg-yellow-500/80 border"></div>
              <div class="w-3 h-3 rounded-full bg-emerald-400/80 dark:bg-green-500/80 border"></div>
              <span class="ml-2 font-mono text-[10px] text-slate-400 dark:text-slate-600">kevin@contact:~$</span>
              <span class="ml-auto font-mono text-[9px] text-slate-300 dark:text-slate-700">&gt; send_message</span>
            </div>

            <!-- Terminal body -->
            <div class="p-6 font-mono text-sm space-y-1.5 bg-slate-50 dark:bg-[#080c14]" #terminalBody>
              @for (line of terminalLines(); track $index) {
                <p class="leading-relaxed" [ngClass]="'line-' + line.color">
                  $ {{ line.text }}
                </p>
              }
              <p class="text-slate-500 dark:text-slate-600 leading-relaxed">
                $ <input #liveInput type="text" readonly
                  [value]="liveText()"
                  class="bg-transparent border-none outline-none font-mono text-sm text-slate-600 dark:text-slate-400 w-0 p-0 inline"
                  style="caret-color: transparent;"
                /><span class="cursor text-indigo-500 dark:text-indigo-400 font-bold">▍</span>
              </p>
            </div>

          </div>
        </div>

        <!-- Form -->
        <div class="flex-1">
          <div class="rounded-2xl p-6 md:p-8 bg-white dark:bg-cyber-900/60 border border-slate-200 dark:border-slate-800/60 shadow-sm shadow-indigo-200/20 dark:shadow-none">
            
            <form #contactForm="ngForm" (ngSubmit)="onSubmit()" class="space-y-5">
              
              <!-- Name -->
              <div>
                <label class="block text-sm font-medium text-indigo-500 dark:text-indigo-400 mb-2">Nombre <span class="text-red-400">*</span></label>
                <input type="text" name="from_name" [(ngModel)]="formData.name" required
                  placeholder="Tu nombre" class="cyber-input" #nameField
                  (keyup)="updateTerminalPreview()" (focus)="updateTerminalPreview()">
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-purple-500 dark:text-purple-400 mb-2">Correo electrónico <span class="text-red-400">*</span></label>
                <input type="email" name="from_email" [(ngModel)]="formData.email" required
                  placeholder="tu@correo.com" class="cyber-input"
                  (keyup)="updateTerminalPreview()" (focus)="updateTerminalPreview()">
              </div>

              <!-- Subject -->
              <div>
                <label class="block text-sm font-medium text-emerald-500 dark:text-emerald-400 mb-2">Asunto</label>
                <input type="text" name="subject" [(ngModel)]="formData.subject"
                  placeholder="Asunto del mensaje" class="cyber-input"
                  (keyup)="updateTerminalPreview()" (focus)="updateTerminalPreview()">
              </div>

              <!-- Message -->
              <div>
                <label class="block text-sm font-medium text-pink-500 dark:text-pink-400 mb-2">Mensaje <span class="text-red-400">*</span></label>
                <textarea name="message" [(ngModel)]="formData.message" required rows="4"
                  placeholder="Escribe tu mensaje aquí..." class="cyber-input resize-none"
                  (keyup)="updateTerminalPreview()" (focus)="updateTerminalPreview()"></textarea>
              </div>

              <!-- Status -->
              @let msg = statusMessage();
              @if (msg) {
                <div class="p-4 rounded-xl font-mono text-xs border"
                  [ngClass]="msg.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-400/5 border-emerald-200 dark:border-emerald-400/30 text-emerald-700 dark:text-emerald-400' :
                            msg.type === 'error' ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400' :
                            'bg-amber-50 dark:bg-yellow-950/30 border-amber-200 dark:border-yellow-800/50 text-amber-600 dark:text-yellow-400'">
                  <span class="text-slate-400 dark:text-slate-600">→</span> {{ msg.text }}
                </div>
              }

              <!-- Submit -->
              <div class="flex items-center gap-4 pt-2">
                <button type="submit" [disabled]="contactForm.invalid || isSending()"
                  class="send-btn">
                  @if (isSending()) {
                    <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.3730 0 0 5.373 0 12h4z"/>
                    </svg>
                    <span>ENVIANDO...</span>
                  } @else {
                    <span>> enviar_mensaje</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  }
                </button>
                <span class="font-mono text-[9px] text-slate-400 dark:text-slate-600 tracking-wider">[emailjs v4]</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent implements OnInit, AfterViewChecked {
  @ViewChild('terminalBody') terminalBodyRef!: ElementRef;
  @ViewChild('liveInput') liveInputRef!: ElementRef;

  readonly formData = { name: '', email: '', subject: '', message: '' };

  private readonly statusSig = signal<{ text: string; type: 'success' | 'error' | 'warning' } | null>(null);
  statusMessage = computed(() => this.statusSig());

  readonly isSending = signal(false);

  readonly terminalLines = signal<TerminalLine[]>([]);
  readonly liveText = signal('');

  protected readonly EMAILJS_PUBLIC_KEY = EMAILJS_PUBLIC_KEY;

  ngOnInit() {
    this.terminalLines.set([
      { text: 'contact_form.js loaded', color: 'dim' },
      { text: 'Initializing EmailJS...', color: 'dim' },
      { text: 'Ready. Fill in the form to send a message.', color: 'green' },
      { text: '', color: 'default' },
      { text: '', color: 'default' },
    ]);
  }

  ngAfterViewChecked() {
    this.scrollTerminal();
  }

  private scrollTerminal() {
    try {
      if (this.terminalBodyRef?.nativeElement) {
        this.terminalBodyRef.nativeElement.scrollTop = this.terminalBodyRef.nativeElement.scrollHeight;
      }
    } catch { /* shadow DOM fallback */ }
  }

  updateTerminalPreview() {
    const { name, email, subject, message } = this.formData;
    const lines: TerminalLine[] = [
      { text: 'contact_form.js loaded', color: 'dim' },
      { text: 'Initializing EmailJS...', color: 'dim' },
      { text: 'Ready. Fill in the form to send a message.', color: 'green' },
      { text: '', color: 'default' },
    ];
    if (name)     lines.push({ text: `from_name: "${name}"`, color: 'cyan' });
    if (email)    lines.push({ text: `from_email: "${email}"`, color: 'cyan' });
    if (subject)  lines.push({ text: `subject: "${subject}"`, color: 'cyan' });
    if (message) {
      const preview = message.length > 45 ? message.slice(0, 42) + '...' : message;
      lines.push({ text: `message: "${preview}"`, color: 'cyan' });
    }
    this.terminalLines.set(lines);

    const last = [name, email, subject, message].filter(Boolean).pop() || '';
    this.liveText.set(last ? `buffer: "${last}"` : '');
  }

  async onSubmit() {
    if (this.isSending() || !this.formData.email) return;

    const spam = checkSpam(this.formData.email);
    if (spam) {
      this.statusSig.set({ text: spam, type: 'error' });
      return;
    }

    this.isSending.set(true);
    this.terminalLines.update(lines => [...lines, { text: '⏳ Sending message via EmailJS...', color: 'yellow' }]);

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: this.formData.name || 'Anónimo',
          from_email: this.formData.email,
          subject: this.formData.subject || 'Sin asunto',
          message: this.formData.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      recordSend(this.formData.email);
      this.terminalLines.update(lines => [...lines,
        { text: '✅ Message sent successfully!', color: 'green' },
        { text: `Status: ${result.status} | Text: ${result.text}`, color: 'dim' },
      ]);
      this.statusSig.set({ text: '✅ ¡Mensaje enviado con éxito! Te responderé pronto.', type: 'success' });
      this.formData.name = '';
      this.formData.email = '';
      this.formData.subject = '';
      this.formData.message = '';
      this.liveText.set('');

    } catch (err: any) {
      console.error('EmailJS error:', err);
      this.terminalLines.update(lines => [...lines,
        { text: `❌ Error: ${err?.text || err?.message || 'Unknown'}`, color: 'red' },
        { text: 'Check EmailJS credentials in contact.component.ts', color: 'dim' },
      ]);
      this.statusSig.set({
        text: '❌ Error al enviar. Revisa que EmailJS esté configurado correctamente.',
        type: 'error'
      });
    } finally {
      this.isSending.set(false);
    }
  }
}
