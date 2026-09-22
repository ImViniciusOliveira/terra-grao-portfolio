import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hero } from './hero';

describe('Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser instanciado com sucesso', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o título e subtítulo da marca', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('O melhor do café especial brasileiro na sua xícara');
    expect(compiled.textContent).toContain('Receba microlotes exclusivos todo mês pelo clube ou abasteça sua casa direto em nossa loja');
  });

  it('deve renderizar os botões de ação Fazer Assinatura e Nossa Loja', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(compiled.querySelectorAll('button'));
    const buttonTexts = buttons.map((b) => b.textContent?.trim());
    expect(buttonTexts).toContain('Fazer Assinatura');
    expect(buttonTexts).toContain('Nossa Loja');
  });

  it('deve renderizar a imagem de destaque da marca', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('img[src="/images/brand-hero.webp"]') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.alt).toContain('Café Especial Terra & Grão');
  });

  it('deve invocar scrollToSection ao clicar no botão', () => {
    const scrollSpy = vi.spyOn(component, 'scrollToSection');
    const primaryButton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    primaryButton.click();
    expect(scrollSpy).toHaveBeenCalledWith('catalogo');
  });
});
