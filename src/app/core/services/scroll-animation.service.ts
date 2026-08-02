import { Injectable, signal, computed, inject, PLATFORM_ID, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ScrollAnimationOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  animationClass?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScrollAnimationService {
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  private elementMap = new Map<Element, { options: ScrollAnimationOptions; callback: () => void }>();

  // Signals for global state
  readonly prefersReducedMotion = signal(false);
  readonly isEnabled = computed(() => !this.prefersReducedMotion());

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initReducedMotionDetection();
      this.createObserver();
    }
  }

  private initReducedMotionDetection(): void {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.prefersReducedMotion.set(motionQuery.matches);
    motionQuery.addEventListener?.('change', (e) => this.prefersReducedMotion.set(e.matches));
  }

  private createObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const data = this.elementMap.get(entry.target);
          if (!data) return;

          if (entry.isIntersecting && this.isEnabled()) {
            const element = entry.target as HTMLElement;
            
            if (data.options.delay) {
              element.style.transitionDelay = `${data.options.delay}ms`;
              element.style.animationDelay = `${data.options.delay}ms`;
            }

            if (data.options.animationClass) {
              element.classList.add(data.options.animationClass);
            } else {
              element.classList.add('animate-fade-in-up');
            }

            element.classList.remove('scroll-reveal');
            data.callback?.();

            if (data.options.triggerOnce !== false) {
              this.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );
  }

  observe(element: Element, options: ScrollAnimationOptions = {}, callback?: () => void): () => void {
    if (!isPlatformBrowser(this.platformId)) return () => {};

    const mergedOptions: ScrollAnimationOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
      triggerOnce: true,
      delay: 0,
      animationClass: 'animate-fade-in-up',
      ...options
    };

    const el = element as HTMLElement;
    el.classList.add('scroll-reveal');
    if (mergedOptions.delay) {
      el.style.transitionDelay = `${mergedOptions.delay}ms`;
      el.style.animationDelay = `${mergedOptions.delay}ms`;
    }

    this.elementMap.set(element, { options: mergedOptions, callback: callback || (() => {}) });
    this.observer?.observe(element);

    return () => this.unobserve(element);
  }

  unobserve(element: Element): void {
    this.observer?.unobserve(element);
    this.elementMap.delete(element);
    element.classList.remove('scroll-reveal');
  }

  observeStaggered(elements: Element[], baseOptions: ScrollAnimationOptions = {}, staggerDelay = 100): () => void {
    const cleanups: (() => void)[] = [];

    elements.forEach((element, index) => {
      const options: ScrollAnimationOptions = {
        ...baseOptions,
        delay: (baseOptions.delay || 0) + index * staggerDelay
      };
      cleanups.push(this.observe(element, options));
    });

    return () => cleanups.forEach(cleanup => cleanup());
  }

  refresh(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.elementMap.forEach((_data, element) => {
      this.observer?.unobserve(element);
      this.observer?.observe(element);
    });
  }

  destroy(): void {
    this.observer?.disconnect();
    this.elementMap.clear();
  }
}

// Directive for easy use in templates
import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly scrollAnimation = inject(ScrollAnimationService);
  private cleanup?: () => void;

  @Input('appScrollReveal') animationType: 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'custom' = 'fade-up';
  @Input() delay = 0;
  @Input() triggerOnce = true;
  @Input() threshold = 0.15;
  @Input() rootMargin = '0px 0px -50px 0px';
  @Input() customClass = '';

  ngOnInit(): void {
    const animationClasses = {
      'fade-up': 'animate-fade-in-up',
      'fade-left': 'animate-fade-in-left',
      'fade-right': 'animate-fade-in-right',
      'scale': 'animate-scale-in',
      'custom': this.customClass || 'animate-fade-in-up'
    };

    this.cleanup = this.scrollAnimation.observe(
      this.el.nativeElement,
      {
        animationClass: animationClasses[this.animationType],
        delay: this.delay,
        triggerOnce: this.triggerOnce,
        threshold: this.threshold,
        rootMargin: this.rootMargin
      }
    );
  }

  ngOnDestroy(): void {
    this.cleanup?.();
  }
}