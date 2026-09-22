import {
  ChangeDetectionStrategy,
  Component,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  imports: [],
  selector: 'app-coupon-banner',
  styleUrl: './coupon-banner.css',
  templateUrl: './coupon-banner.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CouponBanner {
  private readonly platformId = inject(PLATFORM_ID);

  readonly couponCode = signal('GRAO15OFF');
  readonly copied = signal(false);

  copyCoupon(): void {
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard?.writeText(this.couponCode());
      this.copied.set(true);
      setTimeout(() => {
        this.copied.set(false);
      }, 2500);
    }
  }
}
