import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Catalog } from './catalog';
import { COFFEE_PRODUCTS } from '../../core/data/coffee-catalog.mock';

describe('Catalog', () => {
  let component: Catalog;
  let fixture: ComponentFixture<Catalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Catalog],
    }).compileComponents();

    fixture = TestBed.createComponent(Catalog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser instanciado com sucesso', () => {
    expect(component).toBeTruthy();
  });

  it('deve conter 9 produtos no total em todas as categorias', () => {
    expect(component.products().length).toBe(9);
  });

  it('deve inicializar na aba EM DESTAQUE exibindo 5 produtos', () => {
    expect(component.activeTab()).toBe('destaque');
    expect(component.filteredProducts().length).toBe(5);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Mantiqueira Dourada');
    expect(compiled.textContent).toContain('Reserva do Pouso');
    expect(compiled.textContent).toContain('Flor da Serra');
    expect(compiled.textContent).toContain('Geisha Edição Especial');
    expect(compiled.textContent).toContain('Bourbon Amarelo Reserva');
  });

  it('deve alternar para a aba RAROS E PREMIADOS exibindo 3 produtos com avaliações', () => {
    component.setTab('premiados');
    component.visibleCount.set(3);
    fixture.detectChanges();

    expect(component.activeTab()).toBe('premiados');
    expect(component.filteredProducts().length).toBe(3);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Café Jacu Bird Mantiqueira');
    expect(compiled.textContent).toContain('(14)');
    expect(compiled.textContent).toContain('Café Santa Rita Salada de Frutas');
    expect(compiled.textContent).toContain('(89)');
  });

  it('deve alternar para a aba KITS exibindo 1 produto', () => {
    component.setTab('kits');
    component.visibleCount.set(1);
    fixture.detectChanges();

    expect(component.activeTab()).toBe('kits');
    expect(component.filteredProducts().length).toBe(1);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Kit Barista Hario V60 & Café Mantiqueira');
  });

  it('deve calcular e recalcular o preço base, preço original, percentual de desconto e valor Pix/Boleto', () => {
    const mantiqueira = COFFEE_PRODUCTS[0];
    expect(component.getSelectedSize(mantiqueira.id)).toBe('250g');
    expect(component.getCalculatedPrice(mantiqueira)).toBe('44,90');
    expect(component.getOriginalPrice(mantiqueira)).toBe('52,82');
    expect(component.getDiscountPercentage(mantiqueira)).toBe(15);
    expect(component.getPixPrice(mantiqueira)).toBe('42,65');

    component.setSelectedSize(mantiqueira.id, '500g');
    expect(component.getCalculatedPrice(mantiqueira)).toBe('83,06');
    expect(component.getOriginalPrice(mantiqueira)).toBe('97,72');
    expect(component.getDiscountPercentage(mantiqueira)).toBe(15);
    expect(component.getPixPrice(mantiqueira)).toBe('78,91');

    const bourbon = COFFEE_PRODUCTS[4];
    expect(component.getDiscountPercentage(bourbon)).toBe(20);
  });

  it('deve retornar null no preço original e desconto quando o produto não tiver promoção', () => {
    const reserva = COFFEE_PRODUCTS[1];
    expect(component.getOriginalPrice(reserva)).toBeNull();
    expect(component.getDiscountPercentage(reserva)).toBeNull();
  });

  it('deve retornar o estado correto das estrelas para cada índice', () => {
    expect(component.getStarState(4.8, 1)).toBe('full');
    expect(component.getStarState(4.8, 4)).toBe('full');
    expect(component.getStarState(4.8, 5)).toBe('half');
    expect(component.getStarState(3.0, 4)).toBe('empty');
  });

  it('deve alterar o tipo de moagem corretamente', () => {
    const mantiqueira = COFFEE_PRODUCTS[0];
    expect(component.getSelectedGrind(mantiqueira.id)).toBe('Em Grãos');

    component.setSelectedGrind(mantiqueira.id, 'Prensa Francesa');
    expect(component.getSelectedGrind(mantiqueira.id)).toBe('Prensa Francesa');
  });

  it('deve alternar o estado de adicionado ao clicar em addToCart', () => {
    const mantiqueira = COFFEE_PRODUCTS[0];
    expect(component.isAdded(mantiqueira.id)).toBe(false);

    component.addToCart(mantiqueira);
    expect(component.isAdded(mantiqueira.id)).toBe(true);
  });
});
