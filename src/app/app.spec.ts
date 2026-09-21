import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { SeoService } from './core/services/seo.service';

describe('App', () => {
  let seoService: SeoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    seoService = TestBed.inject(SeoService);
  });

  it('deve criar o componente raiz da aplicacao', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('deve chamar injectStructuredData do SeoService no ngOnInit', () => {
    const spy = vi.spyOn(seoService, 'injectStructuredData');
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges(); // Aciona ngOnInit

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
