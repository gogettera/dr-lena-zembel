
// Performance monitoring utilities
import { logger } from './logger';

export interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics = {};

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  public initializeWebVitals(): void {
    if (typeof window === 'undefined') return;

    // LCP - Largest Contentful Paint
    this.observeLCP();
    
    // FID - First Input Delay
    this.observeFID();
    
    // CLS - Cumulative Layout Shift
    this.observeCLS();
    
    // FCP - First Contentful Paint
    this.observeFCP();
    
    // TTFB - Time to First Byte
    this.observeTTFB();
  }

  private observeLCP(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        this.metrics.lcp = lastEntry.startTime;
        logger.debug(`LCP: ${this.metrics.lcp}ms`);
        
        if (this.metrics.lcp > 2500) {
          logger.warn(`LCP is slow: ${this.metrics.lcp}ms (should be < 2500ms)`);
        }
      });
      
      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        logger.debug('LCP observation not supported');
      }
    }
  }

  private observeFID(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.metrics.fid = entry.processingStart - entry.startTime;
          logger.debug(`FID: ${this.metrics.fid}ms`);
          
          if (this.metrics.fid > 100) {
            logger.warn(`FID is slow: ${this.metrics.fid}ms (should be < 100ms)`);
          }
        });
      });
      
      try {
        observer.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        logger.debug('FID observation not supported');
      }
    }
  }

  private observeCLS(): void {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        this.metrics.cls = clsValue;
        logger.debug(`CLS: ${this.metrics.cls}`);
        
        if (this.metrics.cls > 0.1) {
          logger.warn(`CLS is high: ${this.metrics.cls} (should be < 0.1)`);
        }
      });
      
      try {
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        logger.debug('CLS observation not supported');
      }
    }
  }

  private observeFCP(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
            logger.debug(`FCP: ${this.metrics.fcp}ms`);
          }
        });
      });
      
      try {
        observer.observe({ entryTypes: ['paint'] });
      } catch (e) {
        logger.debug('FCP observation not supported');
      }
    }
  }

  private observeTTFB(): void {
    if ('performance' in window && 'timing' in performance) {
      window.addEventListener('load', () => {
        const timing = performance.timing;
        this.metrics.ttfb = timing.responseStart - timing.navigationStart;
        logger.debug(`TTFB: ${this.metrics.ttfb}ms`);
        
        if (this.metrics.ttfb > 600) {
          logger.warn(`TTFB is slow: ${this.metrics.ttfb}ms (should be < 600ms)`);
        }
      });
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public getOverallScore(): number {
    const { lcp, fid, cls } = this.metrics;
    let score = 100;

    // LCP scoring (0-40 points)
    if (lcp !== undefined) {
      if (lcp > 4000) score -= 40;
      else if (lcp > 2500) score -= 20;
    }

    // FID scoring (0-30 points)
    if (fid !== undefined) {
      if (fid > 300) score -= 30;
      else if (fid > 100) score -= 15;
    }

    // CLS scoring (0-30 points)
    if (cls !== undefined) {
      if (cls > 0.25) score -= 30;
      else if (cls > 0.1) score -= 15;
    }

    return Math.max(0, score);
  }
}

// Initialize performance monitoring
export const performanceMonitor = PerformanceMonitor.getInstance();
