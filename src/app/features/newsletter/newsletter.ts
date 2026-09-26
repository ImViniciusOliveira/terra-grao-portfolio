import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  imports: [FormsModule],
  templateUrl: './newsletter.html',
  styleUrl: './newsletter.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Newsletter {
  private readonly platformId = inject(PLATFORM_ID);

  readonly email = signal('');
  readonly showToast = signal(false);

  onEmailInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.email.set(input?.value ?? '');
  }

  onSubmit(): void {
    const emailVal = this.email().trim();
    if (!emailVal || !emailVal.includes('@')) {
      return;
    }

    this.email.set('');
    this.showToast.set(true);

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.showToast.set(false);
      }, 4000);
    }
  }

  closeToast(): void {
    this.showToast.set(false);
  }
}
