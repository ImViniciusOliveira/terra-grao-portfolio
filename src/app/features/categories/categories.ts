import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { QUICK_CATEGORIES } from '../../core/data/categories.mock';
import { QuickCategory } from '../../core/models/category.interface';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Categories {
  private readonly platformId = inject(PLATFORM_ID);

  readonly categories = signal<readonly QuickCategory[]>(QUICK_CATEGORIES);
  readonly page1Categories = computed(() => this.categories().slice(0, 3));
  readonly page2Categories = computed(() => this.categories().slice(3));
  readonly activePage = signal<number>(0);

  scrollToSection(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target) return;
    const pageWidth = target.clientWidth;
    if (pageWidth <= 0) return;

    const page = Math.round(target.scrollLeft / pageWidth);
    this.activePage.set(Math.min(Math.max(page, 0), 1));
  }

  scrollToPage(page: number, container: HTMLElement): void {
    if (!container) return;
    const targetLeft = page * container.clientWidth;
    container.scrollTo({ left: targetLeft, behavior: 'smooth' });
    this.activePage.set(page);
  }
}
