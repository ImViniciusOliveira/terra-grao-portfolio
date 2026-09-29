import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OurHistory } from './our-history';

describe('OurHistory', () => {
  let component: OurHistory;
  let fixture: ComponentFixture<OurHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurHistory],
    }).compileComponents();

    fixture = TestBed.createComponent(OurHistory);
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
