import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhatsAppButton } from './whatsapp-button';

describe('WhatsAppButton', () => {
  let component: WhatsAppButton;
  let fixture: ComponentFixture<WhatsAppButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatsAppButton],
    }).compileComponents();

    fixture = TestBed.createComponent(WhatsAppButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser instanciado com sucesso', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o elemento button com type button e aria-label', () => {
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button).toBeTruthy();
    expect(button.getAttribute('type')).toBe('button');
    expect(button.getAttribute('aria-label')).toBe('WhatsApp');
  });

  it('deve conter o icone svg do whatsapp', () => {
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeTruthy();
  });
});
