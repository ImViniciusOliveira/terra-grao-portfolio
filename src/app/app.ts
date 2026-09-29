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
import { OurHistory } from './features/our-history/our-history';
import { Guarantees } from './features/guarantees/guarantees';
import { WhatsAppButton } from './layout/whatsapp-button/whatsapp-button';

// --------------------------------------------------------------------------
// Componente Raiz da Aplicação
// --------------------------------------------------------------------------
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
    OurHistory,
    Guarantees,
    WhatsAppButton,
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
    // Injeta dados estruturados Schema.org para SEO e Rich Snippets
    this.seoService.injectStructuredData();

    if (isPlatformBrowser(this.platformId)) {
      // Garante que o carregamento da página inicie sempre no topo (F5 / navegação)
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);

      // Inicializa ferramentas de monitoramento de performance e métricas
      injectAnalytics();
      injectSpeedInsights();
    }
  }
}
