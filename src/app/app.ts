import { Component, inject, OnInit, signal } from '@angular/core';
import { SeoService } from './core/services/seo.service';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { Hero } from './features/hero/hero';

@Component({
  imports: [Header, Footer, Hero],
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
