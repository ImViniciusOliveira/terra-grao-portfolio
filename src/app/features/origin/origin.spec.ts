import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Origin } from './origin';

describe('Origin', () => {
  let component: Origin;
  let fixture: ComponentFixture<Origin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Origin],
    }).compileComponents();

    fixture = TestBed.createComponent(Origin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser instanciado com sucesso', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o título principal de origem', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Nossa História');
    expect(compiled.textContent).toContain('A essência do campo em cada grão');
  });

  it('deve listar os 3 pilares de destaque da origem', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.highlights.length).toBe(3);
    expect(compiled.textContent).toContain('Secagem Natural ao Sol');
    expect(compiled.textContent).toContain('Colheita 100% Manual & Seletiva');
    expect(compiled.textContent).toContain('Rastreabilidade & Origem Garantida');
  });

  it('deve exibir métricas institucionais de qualidade e pontuação SCAA', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Produção Artesanal');
    expect(compiled.textContent).toContain('100%');
    expect(compiled.textContent).toContain('84+');
  });
});
