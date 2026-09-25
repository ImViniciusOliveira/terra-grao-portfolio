import { Component, inject, OnInit, signal } from '@angular/core';
import { SeoService } from './core/services/seo.service';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { Hero } from './features/hero/hero';
import { Categories } from './features/categories/categories';
import { Catalog } from './features/catalog/catalog';
import { CouponBanner } from './features/coupon-banner/coupon-banner';
import { Newsletter } from './features/newsletter/newsletter';
import { BrewingCalculator } from './features/brewing-calculator/brewing-calculator';

@Component({
  imports: [Header, Footer, Hero, Categories, Catalog, CouponBanner, Newsletter, BrewingCalculator],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly seoService = inject(SeoService);
  protected readonly title = signal('terra-grao-web');

  ngOnInit(): void {
    this.seoService.injectStructuredData();
  }
}
