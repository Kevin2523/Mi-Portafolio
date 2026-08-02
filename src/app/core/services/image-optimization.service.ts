import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ImageOptimizationConfig {
  quality: number;
  format: 'webp' | 'avif' | 'auto';
  widths: number[];
  placeholder: 'blur' | 'dominant' | 'none';
}

@Injectable({
  providedIn: 'root'
})
export class ImageOptimizationService {
  private readonly platformId = inject(PLATFORM_ID);
  
  readonly config = signal<ImageOptimizationConfig>({
    quality: 80,
    format: 'auto',
    widths: [320, 640, 960, 1280, 1920],
    placeholder: 'blur'
  });

  // Generate responsive srcset for an image
  generateSrcSet(basePath: string, config?: Partial<ImageOptimizationConfig>): string {
    const cfg = { ...this.config(), ...config };
    const ext = this.getExtension(basePath);
    const name = basePath.replace(`.${ext}`, '');
    
    return cfg.widths
      .map(w => `${name}-${w}w.${cfg.format === 'auto' ? 'webp' : cfg.format} ${w}w`)
      .join(', ');
  }

  // Generate picture element sources
  generatePictureSources(basePath: string, config?: Partial<ImageOptimizationConfig>): { srcset: string; type: string; media?: string }[] {
    const cfg = { ...this.config(), ...config };
    const ext = this.getExtension(basePath);
    const name = basePath.replace(`.${ext}`, '');
    
    const sources: { srcset: string; type: string; media?: string }[] = [];
    
    // AVIF (best compression)
    if (cfg.format === 'avif' || cfg.format === 'auto') {
      sources.push({
        srcset: cfg.widths.map(w => `${name}-${w}w.avif ${w}w`).join(', '),
        type: 'image/avif'
      });
    }
    
    // WebP (good compression, wide support)
    if (cfg.format === 'webp' || cfg.format === 'auto') {
      sources.push({
        srcset: cfg.widths.map(w => `${name}-${w}w.webp ${w}w`).join(', '),
        type: 'image/webp'
      });
    }
    
    // Fallback original format
    sources.push({
      srcset: cfg.widths.map(w => `${name}-${w}w.${ext} ${w}w`).join(', '),
      type: `image/${ext === 'jpg' ? 'jpeg' : ext}`
    });
    
    return sources;
  }

  // Generate blur placeholder data URL
  generateBlurPlaceholder(basePath: string, width = 20, height = 20): string {
    // Returns a tiny base64 encoded placeholder
    // In production, this would be generated at build time
    return `data:image/${this.getExtension(basePath)};base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mNk+M9Qz0AEYBxVSF+FAAhKDVEZGAElEFlAEGQC9wNQe8iO5QAAAABJRU5ErkJggg==`;
  }

  // Generate sizes attribute based on common breakpoints
  generateSizes(breakpoints: { maxWidth: number; size: string }[] = [
    { maxWidth: 640, size: '100vw' },
    { maxWidth: 1024, size: '50vw' },
    { maxWidth: 1920, size: '33vw' },
    { maxWidth: Infinity, size: '25vw' }
  ]): string {
    return breakpoints
      .map(bp => `(max-width: ${bp.maxWidth}px) ${bp.size}`)
      .join(', ');
  }

  // Preload critical images
  preloadImages(paths: string[]): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    paths.forEach(path => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = path;
      document.head.appendChild(link);
    });
  }

  // Lazy load images with IntersectionObserver
  observeImages(selector = 'img[data-src]', rootMargin = '50px'): IntersectionObserver | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset['src'];
          const srcset = img.dataset['srcset'];
          
          if (src) img.src = src;
          if (srcset) img.srcset = srcset;
          
          img.removeAttribute('data-src');
          img.removeAttribute('data-srcset');
          img.classList.add('loaded');
          
          observer.unobserve(img);
        }
      });
    }, { rootMargin });
    
    document.querySelectorAll(selector).forEach(img => observer.observe(img));
    return observer;
  }

  private getExtension(path: string): string {
    return path.split('.').pop()?.toLowerCase() || 'jpg';
  }
}