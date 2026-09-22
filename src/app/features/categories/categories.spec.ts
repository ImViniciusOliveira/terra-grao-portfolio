import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Categories } from './categories';

describe('Categories', () => {
  let component: Categories;
  let fixture: ComponentFixture<Categories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Categories],
    }).compileComponents();

    fixture = TestBed.createComponent(Categories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser instanciado com sucesso', () => {
    expect(component).toBeTruthy();
  });

  it('deve conter 5 categorias cadastradas na linha principal', () => {
    expect(component.categories().length).toBe(5);
    expect(component.page1Categories().length).toBe(3);
    expect(component.page2Categories().length).toBe(2);
  });

  it('deve renderizar o título da seção e os 5 nomes de categorias corretamente', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Categorias em Destaque');
    expect(compiled.textContent).toContain('Café em Grãos');
    expect(compiled.textContent).toContain('Café Moído');
    expect(compiled.textContent).toContain('Cafeteiras & Métodos');
    expect(compiled.textContent).toContain('Moedores & Acessórios');
    expect(compiled.textContent).toContain('Kits & Degustação');
  });

  it('deve chamar scrollIntoView com segurança ao acionar scrollToSection', () => {
    const dummyElement = document.createElement('div');
    dummyElement.id = 'catalogo';
    dummyElement.scrollIntoView = vi.fn();
    document.body.appendChild(dummyElement);

    const scrollSpy = vi.spyOn(dummyElement, 'scrollIntoView');
    component.scrollToSection('catalogo');

    expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    dummyElement.remove();
  });

  it('deve atualizar activePage ao disparar evento de scroll', () => {
    const dummyContainer = document.createElement('div');
    Object.defineProperty(dummyContainer, 'scrollWidth', { value: 600, configurable: true });
    Object.defineProperty(dummyContainer, 'clientWidth', { value: 300, configurable: true });
    Object.defineProperty(dummyContainer, 'scrollLeft', { value: 50, writable: true, configurable: true });

    const scrollEvent = { target: dummyContainer } as unknown as Event;
    component.onScroll(scrollEvent);
    expect(component.activePage()).toBe(0);

    dummyContainer.scrollLeft = 200;
    component.onScroll(scrollEvent);
    expect(component.activePage()).toBe(1);
  });

  it('deve executar scrollTo e atualizar activePage ao chamar scrollToPage', () => {
    const dummyContainer = document.createElement('div');
    Object.defineProperty(dummyContainer, 'scrollWidth', { value: 600 });
    Object.defineProperty(dummyContainer, 'clientWidth', { value: 300 });
    dummyContainer.scrollTo = vi.fn();

    component.scrollToPage(1, dummyContainer);
    expect(component.activePage()).toBe(1);
    expect(dummyContainer.scrollTo).toHaveBeenCalledWith({
      left: 300,
      behavior: 'smooth',
    });

    component.scrollToPage(0, dummyContainer);
    expect(component.activePage()).toBe(0);
    expect(dummyContainer.scrollTo).toHaveBeenCalledWith({
      left: 0,
      behavior: 'smooth',
    });
  });
});
