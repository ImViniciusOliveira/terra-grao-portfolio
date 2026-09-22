import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  imports: [FormsModule],
  templateUrl: './newsletter.html',
  styleUrl: './newsletter.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Newsletter {
  readonly email = signal('');

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
  }
}
