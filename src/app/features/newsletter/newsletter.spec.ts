import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Newsletter } from './newsletter';

describe('Newsletter', () => {
  let component: Newsletter;
  let fixture: ComponentFixture<Newsletter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Newsletter],
    }).compileComponents();

    fixture = TestBed.createComponent(Newsletter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser instanciado com sucesso', () => {
    expect(component).toBeTruthy();
    expect(component.email()).toBe('');
  });

  it('deve renderizar o título, texto descritivo e campo de formulário', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Receba novidades e ofertas exclusivas');
    expect(compiled.textContent).toContain(
      'Cadastre seu e-mail para receber avisos de novos lotes e ofertas especiais.'
    );
    expect(compiled.querySelector('input[type="email"]')).toBeTruthy();
    expect(compiled.textContent).toContain('Cadastrar');
  });

  it('deve atualizar o sinal email ao digitar no campo de input', () => {
    const input = fixture.nativeElement.querySelector(
      'input[type="email"]'
    ) as HTMLInputElement;
    input.value = 'contato@cafeespecial.com';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.email()).toBe('contato@cafeespecial.com');
  });

  it('nao deve limpar o email se for invalido ou vazio', () => {
    component.email.set('');
    component.onSubmit();
    expect(component.email()).toBe('');

    component.email.set('invalido');
    component.onSubmit();
    expect(component.email()).toBe('invalido');
  });

  it('deve limpar o campo de e-mail ao submeter valor valido sem exibir mensagens de alerta', () => {
    component.email.set('cliente@terraegrao.com.br');
    component.onSubmit();
    fixture.detectChanges();

    expect(component.email()).toBe('');

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).not.toContain('E-mail cadastrado com sucesso!');
    expect(compiled.querySelector('input[type="email"]')).toBeTruthy();
  });
});
