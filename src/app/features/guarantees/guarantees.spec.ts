import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Guarantees } from './guarantees';

describe('Guarantees', () => {
  let component: Guarantees;
  let fixture: ComponentFixture<Guarantees>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Guarantees],
    }).compileComponents();

    fixture = TestBed.createComponent(Guarantees);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser instanciado com sucesso', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o título de compromisso de qualidade', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Compromisso de Qualidade');
  });

  it('deve renderizar os 4 cards de garantia de qualidade', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.guaranteeItems.length).toBe(4);
    expect(compiled.textContent).toContain('Torra Artesanal Fresca Semanal');
    expect(compiled.textContent).toContain('Grãos 100% Arábica (84+ SCAA)');
    expect(compiled.textContent).toContain('Embalagem Válvula & Zip Lock');
    expect(compiled.textContent).toContain('Comércio Justo & Sustentável');
  });

  it('deve conter as badges informativas em cada card', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Torra Semanal');
    expect(compiled.textContent).toContain('Qualidade SCAA');
    expect(compiled.textContent).toContain('Máxima Proteção');
    expect(compiled.textContent).toContain('Origem Sustentável');
  });
});
