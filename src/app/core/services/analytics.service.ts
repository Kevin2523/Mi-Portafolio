import { Injectable, signal, computed, inject, PLATFORM_ID, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface AnalyticsConfig {
  provider: 'plausible' | 'umami' | 'vercel' | 'custom';
  domain?: string;
  apiHost?: string;
  scriptUrl?: string;
  dataDomain?: string;
  enableAutoPageviews?: boolean;
  enableHashTracking?: boolean;
  trackLocalStorage?: boolean;
  respectDNT?: boolean;
}

export interface AnalyticsEvent {
  name: string;
  props?: Record<string, string | number | boolean>;
  timestamp?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly platformId = inject(PLATFORM_ID);
  
  private config = signal<AnalyticsConfig>({
    provider: 'plausible',
    enableAutoPageviews: true,
    enableHashTracking: true,
    respectDNT: true
  });

  private initialized = signal(false);
  private queue: AnalyticsEvent[] = [];

  readonly isEnabled = computed(() => this.initialized() && isPlatformBrowser(this.platformId));

  configure(config: Partial<AnalyticsConfig>): void {
    this.config.update(current => ({ ...current, ...config }));
    if (isPlatformBrowser(this.platformId) && !this.initialized()) {
      this.init();
    }
  }

  private init(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Check Do Not Track
    if (this.config().respectDNT && (navigator.doNotTrack === '1' || (window as any).doNotTrack === '1')) {
      console.log('[Analytics] Do Not Track enabled, analytics disabled');
      return;
    }

    this.initialized.set(true);
    this.loadScript();
    this.processQueue();
  }

  private loadScript(): void {
    const cfg = this.config();
    const scriptUrl = cfg.scriptUrl || this.getDefaultScriptUrl(cfg.provider);
    
    if (!scriptUrl) return;

    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = scriptUrl;
    
    if (cfg.provider === 'plausible' && cfg.domain) {
      script.setAttribute('data-domain', cfg.domain);
    }
    
    if (cfg.apiHost) {
      script.setAttribute('data-api', cfg.apiHost);
    }

    document.head.appendChild(script);
  }

  private getDefaultScriptUrl(provider: string): string {
    switch (provider) {
      case 'plausible':
        return 'https://plausible.io/js/script.js';
      case 'umami':
        return 'https://cdn.umami.is/umami.js';
      case 'vercel':
        return '/_vercel/insights/script.js';
      default:
        return '';
    }
  }

  private processQueue(): void {
    while (this.queue.length > 0) {
      const event = this.queue.shift();
      if (event) this.trackEvent(event.name, event.props);
    }
  }

  // Track page view
  trackPageview(path?: string, title?: string): void {
    const url = path || (isPlatformBrowser(this.platformId) ? window.location.pathname : '/');
    const pageTitle = title || (isPlatformBrowser(this.platformId) ? document.title : '');
    
    this.trackEvent('pageview', { url, title: pageTitle });
  }

  // Track custom event
  trackEvent(name: string, props?: Record<string, string | number | boolean>): void {
    const event: AnalyticsEvent = { name, props, timestamp: Date.now() };
    
    if (!this.initialized()) {
      this.queue.push(event);
      return;
    }

    this.sendEvent(event);
  }

  private sendEvent(event: AnalyticsEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const cfg = this.config();
    
    try {
      switch (cfg.provider) {
        case 'plausible':
          this.sendPlausibleEvent(event);
          break;
        case 'umami':
          this.sendUmamiEvent(event);
          break;
        case 'vercel':
          this.sendVercelEvent(event);
          break;
        case 'custom':
          this.sendCustomEvent(event);
          break;
      }
    } catch (error) {
      console.warn('[Analytics] Failed to send event:', error);
    }
  }

  private sendPlausibleEvent(event: AnalyticsEvent): void {
    const plausible = (window as any).plausible;
    if (plausible) {
      plausible(event.name, { props: event.props });
    } else if (event.name === 'pageview') {
      // Fallback for pageview
      const url = event.props?.['url'] as string || '';
      const payload = { n: 'pageview', u: url, r: document.referrer };
      this.sendBeacon('https://plausible.io/api/event', payload);
    }
  }

  private sendUmamiEvent(event: AnalyticsEvent): void {
    const umami = (window as any).umami;
    if (umami) {
      umami.track(event.name, event.props);
    }
  }

  private sendVercelEvent(event: AnalyticsEvent): void {
    const va = (window as any).va;
    if (va) {
      va.track(event.name, event.props);
    }
  }

  private sendCustomEvent(event: AnalyticsEvent): void {
    // Custom endpoint
    const cfg = this.config();
    if (cfg.apiHost) {
      this.sendBeacon(cfg.apiHost, event);
    }
  }

  private sendBeacon(url: string, data: any): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, JSON.stringify(data));
    } else {
      // Fallback
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        keepalive: true,
        headers: { 'Content-Type': 'application/json' }
      }).catch(() => {});
    }
  }

  // Convenience methods
  trackClick(element: string, location: string): void {
    this.trackEvent('click', { element, location });
  }

  trackFormSubmit(formName: string, success: boolean): void {
    this.trackEvent('form_submit', { form: formName, success });
  }

  trackDownload(fileName: string, fileType: string): void {
    this.trackEvent('download', { file: fileName, type: fileType });
  }

  trackExternalLink(url: string, text: string): void {
    this.trackEvent('external_link', { url, text });
  }

  trackSearch(query: string, resultsCount: number): void {
    this.trackEvent('search', { query, results: resultsCount });
  }

  trackError(error: string, context?: string): void {
    this.trackEvent('error', { error, context: context || '' });
  }

  trackTiming(name: string, duration: number): void {
    this.trackEvent('timing', { name, duration });
  }

  // User properties (for identification)
  identify(userId: string, traits?: Record<string, any>): void {
    this.trackEvent('identify', { userId, ...traits });
  }

  // Reset user (logout)
  reset(): void {
    this.trackEvent('reset');
  }
}

// Auto-track route changes
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsRouterTracker {
  private readonly router = inject(Router);
  private readonly analytics = inject(AnalyticsService);

  constructor() {
    this.init();
  }

  private init(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Access config through a public getter or method
      this.analytics.trackPageview(event.urlAfterRedirects);
    });
  }
}