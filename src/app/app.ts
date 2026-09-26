import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { inject as injectAnalytics } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { SeoService } from './core/services/seo.service';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { Hero } from './features/hero/hero';
import { Categories } from './features/categories/categories';
import { Catalog } from './features/catalog/catalog';
import { CouponBanner } from './features/coupon-banner/coupon-banner';
import { Newsletter } from './features/newsletter/newsletter';
import { BrewingCalculator } from './features/brewing-calculator/brewing-calculator';
import { Origin } from './features/origin/origin';
import { Guarantees } from './features/guarantees/guarantees';

@Component({
  imports: [
    Header,
    Footer,
    Hero,
    Categories,
    Catalog,
    CouponBanner,
    Newsletter,
    BrewingCalculator,
    Origin,
    Guarantees,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly seoService = inject(SeoService);
  protected readonly title = signal('terra-grao-web');

  ngOnInit(): void {
    this.seoService.injectStructuredData();

    if (isPlatformBrowser(this.platformId)) {
      injectAnalytics();
      injectSpeedInsights();
    }
  }
}
