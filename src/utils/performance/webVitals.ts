
import { logger } from '@/utils/logger';

interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

interface PerformanceThresholds {
  lcp: { good: number; poor: number };
  fid: { good: number; poor: number };
  cls: { good: number; poor: number };
  fcp: { good: number; poor: number };
  ttfb: { good: number; poor: number };
}

const THRESHOLDS: PerformanceThresholds = {
  lcp: { good: 2500, poor: 4000 },
  fid: { good: 100, poor: 300 },
  cls: { good: 0.1, poor: 0.25 },
  fcp: { good: 1800, poor: 3000 },
  ttfb: { good: 800, poor: 1800 }
};

export class WebVitalsTracker {
  private metrics: Map<string, WebVitalMetric> = new Map();
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeTracking();
  }

  private initializeTracking() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    try {
      // Track Largest Contentful Paint (LCP)
      this.observeMetric('largest-contentful-paint', (entries) => {
        const lastEntry = entries[entries.length - 1];
        this.recordMetric('lcp', lastEntry.startTime);
      });

      // Track First Input Delay (FID)
      this.observeMetric('first-input', (entries) => {
        const firstEntry = entries[0];
        const fid = firstEntry.processingStart - firstEntry.startTime;
        this.recordMetric('fid', fid);
      });

      // Track Cumulative Layout Shift (CLS)
      let clsValue = 0;
      this.observeMetric('layout-shift', (entries) => {
        for (const entry of entries) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        this.recordMetric('cls', clsValue);
      });

      // Track First Contentful Paint (FCP)
      this.observeMetric('paint', (entries) => {
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          this.recordMetric('fcp', fcpEntry.startTime);
        }
      });

      // Track Time to First Byte (TTFB)
      this.observeNavigation();

    } catch (error) {
      logger.warn('Web Vitals tracking initialization failed', error);
    }
  }

  private observeMetric(entryType: string, callback: (entries: any[]) => void) {
    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries());
      });
      observer.observe({ entryTypes: [entryType] });
      this.observers.push(observer);
    } catch (error) {
      logger.debug(`Failed to observe ${entryType}`, error);
    }
  }

  private observeNavigation() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        for (const entry of entries) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            const ttfb = navEntry.responseStart - navEntry.requestStart;
            this.recordMetric('ttfb', ttfb);
          }
        }
      });
      observer.observe({ entryTypes: ['navigation'] });
      this.observers.push(observer);
    } catch (error) {
      logger.debug('Failed to observe navigation timing', error);
    }
  }

  private recordMetric(name: string, value: number) {
    const threshold = THRESHOLDS[name as keyof PerformanceThresholds];
    let rating: 'good' | 'needs-improvement' | 'poor' = 'good';

    if (threshold) {
      if (value > threshold.poor) {
        rating = 'poor';
      } else if (value > threshold.good) {
        rating = 'needs-improvement';
      }
    }

    const metric: WebVitalMetric = {
      name,
      value,
      rating,
      delta: value - (this.metrics.get(name)?.value || 0),
      id: `${name}-${Date.now()}`
    };

    this.metrics.set(name, metric);
    
    // Log performance metrics for monitoring
    logger.info(`Web Vital - ${name.toUpperCase()}`, {
      value: Math.round(value),
      rating,
      timestamp: new Date().toISOString()
    });

    // Send to analytics if needed
    this.sendToAnalytics(metric);
  }

  private sendToAnalytics(metric: WebVitalMetric) {
    // In a real implementation, you'd send this to your analytics service
    if (metric.rating === 'poor') {
      logger.warn(`Poor performance detected: ${metric.name} = ${metric.value}ms`);
    }
  }

  public getMetrics(): Map<string, WebVitalMetric> {
    return new Map(this.metrics);
  }

  public getMetric(name: string): WebVitalMetric | undefined {
    return this.metrics.get(name);
  }

  public disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

export const webVitalsTracker = new WebVitalsTracker();
