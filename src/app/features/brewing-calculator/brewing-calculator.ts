import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { BREWING_METHODS } from '../../core/data/brewing-methods.mock';
import { BrewingMethodId } from '../../core/models/brewing.interface';

@Component({
  selector: 'app-brewing-calculator',
  templateUrl: './brewing-calculator.html',
  styleUrl: './brewing-calculator.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrewingCalculator {
  protected readonly methods = BREWING_METHODS;
  protected readonly selectedId = signal<BrewingMethodId>('v60');
  protected readonly coffeeGrams = signal(20);

  protected readonly currentMethod = computed(() =>
    this.methods.find((m) => m.id === this.selectedId()) ?? this.methods[0]
  );

  protected readonly calculatedWater = computed(
    () => this.coffeeGrams() * this.currentMethod().defaultRatio
  );

  protected selectMethod(id: BrewingMethodId): void {
    this.selectedId.set(id);
  }

  protected onSliderChange(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.coffeeGrams.set(value);
  }
}
