import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser instanciado com sucesso', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar com o ano corrente no signal currentYear', () => {
    const anoAtual = new Date().getFullYear();
    expect(component.currentYear()).toBe(anoAtual);
  });

  it('deve renderizar a marca Terra & Grão • Loja Online e o texto institucional', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Terra & Grão • Loja Online');
    expect(compiled.textContent).toContain('Trabalhamos com cafés especiais de alta qualidade');
  });

  it('deve renderizar o selo de ambiente 100% seguro e criptografado', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Ambiente 100% Seguro & Criptografado');
  });

  it('deve renderizar a secao Nossos Cafés com formatos de compra reais', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Nossos Cafés');
    expect(compiled.textContent).toContain('Café em Grãos');
    expect(compiled.textContent).toContain('Café Moído');
    expect(compiled.textContent).toContain('Edições Especiais');
    expect(compiled.textContent).toContain('Kits de Cafés');
  });

  it('deve renderizar a secao Minha Conta & Links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Minha Conta & Links');
    expect(compiled.textContent).toContain('Minha Conta');
    expect(compiled.textContent).toContain('Meus Pedidos');
    expect(compiled.textContent).toContain('Guia de Preparo');
    expect(compiled.textContent).toContain('Trocas e Devoluções');
  });

  it('deve renderizar a secao Atendimento & Empresa com CNPJ e e-mail', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Atendimento & Empresa');
    expect(compiled.textContent).toContain('Serra da Mantiqueira, Minas Gerais • Brasil');
    expect(compiled.textContent).toContain('atendimento@terraegrao.com.br');
    expect(compiled.textContent).toContain('CNPJ: 54.772.017/0001-96');
  });

  it('deve renderizar a faixa inferior de direitos autorais', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const ano = new Date().getFullYear();
    expect(compiled.textContent).toContain(`© ${ano} Terra & Grão. Todos os direitos reservados.`);
    expect(compiled.textContent).toContain('Privacidade');
    expect(compiled.textContent).toContain('Termos de Compra');
  });
});

