import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CouponBanner } from './coupon-banner';

describe('CouponBanner', () => {
  let component: CouponBanner;
  let fixture: ComponentFixture<CouponBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponBanner],
    }).compileComponents();

    fixture = TestBed.createComponent(CouponBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('deve ser instanciado com sucesso', () => {
    expect(component).toBeTruthy();
    expect(component.couponCode()).toBe('GRAO15OFF');
    expect(component.copied()).toBe(false);
  });

  it('deve renderizar o título, texto descritivo e código do cupom', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Ganhe 15% OFF no seu primeiro pedido');
    expect(compiled.textContent).toContain(
      'Aproveite esse cupom com desconto exclusivo na sua primeira compra.'
    );
    expect(compiled.textContent).toContain('GRAO15OFF');
  });

  it('deve acionar o clipboard e alternar o sinal de cópia com sucesso', () => {
    vi.useFakeTimers();

    if (!navigator.clipboard) {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn().mockResolvedValue(undefined) },
        configurable: true,
      });
    } else {
      vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);
    }

    const writeSpy = vi.spyOn(navigator.clipboard, 'writeText');

    component.copyCoupon();
    fixture.detectChanges();

    expect(writeSpy).toHaveBeenCalledWith('GRAO15OFF');
    expect(component.copied()).toBe(true);

    const checkIcon = fixture.nativeElement.querySelector('svg.text-green-700');
    expect(checkIcon).toBeTruthy();
    expect(fixture.nativeElement.textContent).not.toContain('Copiado!');

    vi.advanceTimersByTime(2600);
    fixture.detectChanges();

    expect(component.copied()).toBe(false);
  });
});
