import { RouterOutlet } from '@angular/router';
import { Component, inject, OnInit, signal } from '@angular/core';
import { SeoService } from './core/services/seo.service';

@Component({
  imports: [RouterOutlet],
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
