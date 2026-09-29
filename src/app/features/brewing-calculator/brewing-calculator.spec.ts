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

  it('deve ser instanciado com sucesso', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar a seção com o id calculadora', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const section = compiled.querySelector('section#calculadora');
    expect(section).toBeTruthy();
  });

  it('deve renderizar o título Como Preparar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h2 = compiled.querySelector('h2');
    expect(h2?.textContent?.trim()).toContain('Como Preparar');
  });

  it('deve renderizar as 4 abas de métodos de preparo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(4);
    expect(buttons[0].textContent?.trim()).toBe('Hario V60');
    expect(buttons[1].textContent?.trim()).toBe('Prensa Francesa');
    expect(buttons[2].textContent?.trim()).toBe('Chemex');
    expect(buttons[3].textContent?.trim()).toBe('AeroPress');
  });

  it('deve iniciar por padrão na Hario V60 com 20g e calcular 320ml de água', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const waterValue = compiled.querySelectorAll('p.font-display.font-bold')[0];
    expect(waterValue?.textContent?.trim()).toContain('320 ml');
  });

  it('deve atualizar o volume de água ao alterar o valor do slider', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const slider = compiled.querySelector('input[type="range"]') as HTMLInputElement;

    slider.value = '30';
    slider.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const waterValue = compiled.querySelectorAll('p.font-display.font-bold')[0];
    expect(waterValue?.textContent?.trim()).toContain('480 ml');
  });

  it('deve alternar o método de preparo ao clicar na aba correspondente', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');

    // Clica na Prensa Francesa
    buttons[1].click();
    fixture.detectChanges();

    // Proporção da Prensa Francesa é 1:15 (20g de café → 300ml de água)
    const waterValue = compiled.querySelectorAll('p.font-display.font-bold')[0];
    expect(waterValue?.textContent?.trim()).toContain('300 ml');

    const tempValue = compiled.querySelectorAll('p.font-display.font-bold')[1];
    expect(tempValue?.textContent?.trim()).toContain('94°C');
  });
});
