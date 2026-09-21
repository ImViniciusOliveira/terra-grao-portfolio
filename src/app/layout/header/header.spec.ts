import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser instanciado com sucesso', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar com o menu mobile fechado', () => {
    expect(component.isMenuOpen()).toBe(false);
    expect(component.isMenuVisible()).toBe(false);
  });

  it('deve abrir e fechar o menu mobile ao alternar toggleMenu', () => {
    component.toggleMenu();
    expect(component.isMenuOpen()).toBe(true);
    expect(component.isMenuVisible()).toBe(true);

    component.toggleMenu();
    expect(component.isMenuOpen()).toBe(false);
  });

  it('deve atualizar a secao ativa ao chamar scrollToSection', () => {
    component.scrollToSection('catalogo');
    expect(component.activeSection()).toBe('catalogo');

    component.scrollToSection('calculadora');
    expect(component.activeSection()).toBe('calculadora');
  });

  it('deve renderizar o logotipo e o subtitulo da marca no template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Terra & Grão');
    expect(compiled.textContent).toContain('Cafés Especiais');
  });

  it('deve renderizar a barra de frete gratis com as faixas de valores por regiao e desconto no PIX', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Frete grátis');
    expect(compiled.textContent).toContain('a partir de R$ 199,90 para Sul e Sudeste');
    expect(compiled.textContent).toContain('R$ 259,90 para Norte, Nordeste e Centro-Oeste');
    expect(compiled.textContent).toContain('5% OFF');
    expect(compiled.textContent).toContain('no PIX ou Boleto');
  });

  it('deve alternar o estado do tema ao chamar toggleTheme', () => {
    expect(component.isDarkMode()).toBe(false);
    component.toggleTheme();
    expect(component.isDarkMode()).toBe(true);
    component.toggleTheme();
    expect(component.isDarkMode()).toBe(false);
  });
});
