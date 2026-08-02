import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';
import { ImageOptimizationService } from './image-optimization.service';

@Directive({
  selector: 'img[appOptimizedImage]',
  standalone: true
})
export class OptimizedImageDirective implements OnInit {
  private readonly el = inject(ElementRef<HTMLImageElement>);
  private readonly imageService = inject(ImageOptimizationService);
  
  @Input('appOptimizedImage') src!: string;
  @Input() alt = '';
  @Input() widths?: number[];
  @Input() quality = 80;
  @Input() placeholder = 'blur';
  @Input() sizes?: string;
  @Input() priority = false;

  ngOnInit(): void {
    const img = this.el.nativeElement;
    
    if (this.priority) {
      // Priority images load immediately
      img.src = this.src;
      img.loading = 'eager';
      img.fetchPriority = 'high';
    } else {
      // Lazy load with data-src
      img.loading = 'lazy';
      img.dataset['src'] = this.src;
      
      // Generate srcset if widths provided
      if (this.widths && this.widths.length > 0) {
        img.srcset = this.imageService.generateSrcSet(this.src, { widths: this.widths, quality: this.quality });
        img.sizes = this.sizes || this.imageService.generateSizes();
      }
      
      // Add blur placeholder
      if (this.placeholder === 'blur') {
        img.style.filter = 'blur(20px)';
        img.style.transition = 'filter 0.3s ease-out';
        img.dataset['placeholder'] = this.imageService.generateBlurPlaceholder(this.src);
      }
    }
    
    img.alt = this.alt;
    
    // Remove blur when loaded
    img.onload = () => {
      img.style.filter = 'none';
    };
  }
}