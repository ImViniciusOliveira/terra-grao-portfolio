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
});
