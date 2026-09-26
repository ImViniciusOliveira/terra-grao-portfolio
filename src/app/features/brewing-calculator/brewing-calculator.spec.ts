import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrewingCalculator } from './brewing-calculator';

describe('BrewingCalculator', () => {
  let component: BrewingCalculator;
  let fixture: ComponentFixture<BrewingCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrewingCalculator],
    }).compileComponents();

    fixture = TestBed.createComponent(BrewingCalculator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section with id calculadora', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const section = compiled.querySelector('section#calculadora');
    expect(section).toBeTruthy();
  });

  it('should render title Como Preparar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h2 = compiled.querySelector('h2');
    expect(h2?.textContent?.trim()).toContain('Como Preparar');
  });

  it('should render 4 method tabs', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(4);
    expect(buttons[0].textContent?.trim()).toBe('Hario V60');
    expect(buttons[1].textContent?.trim()).toBe('Prensa Francesa');
    expect(buttons[2].textContent?.trim()).toBe('Chemex');
    expect(buttons[3].textContent?.trim()).toBe('AeroPress');
  });

  it('should default to V60 with 20g and calculate 320ml water', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const waterValue = compiled.querySelectorAll('.font-display.font-bold')[0];
    expect(waterValue?.textContent?.trim()).toContain('320 ml');
  });

  it('should update water when slider changes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const slider = compiled.querySelector('input[type="range"]') as HTMLInputElement;

    slider.value = '30';
    slider.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const waterValue = compiled.querySelectorAll('.font-display.font-bold')[0];
    expect(waterValue?.textContent?.trim()).toContain('480 ml');
  });

  it('should switch method when tab is clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');

    // Click Prensa Francesa
    buttons[1].click();
    fixture.detectChanges();

    // Prensa has ratio 15, default 20g → 300ml
    const waterValue = compiled.querySelectorAll('.font-display.font-bold')[0];
    expect(waterValue?.textContent?.trim()).toContain('300 ml');

    const tempValue = compiled.querySelectorAll('.font-display.font-bold')[1];
    expect(tempValue?.textContent?.trim()).toContain('94°C');
  });
});
