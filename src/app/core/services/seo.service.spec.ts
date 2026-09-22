import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let document: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeoService],
    });
    service = TestBed.inject(SeoService);
    document = TestBed.inject(DOCUMENT);

    // Remove qualquer script residual antes de cada teste
    const existing = document.getElementById('schema-org-structured-data');
    if (existing) {
      existing.remove();
    }
  });

  afterEach(() => {
    const existing = document.getElementById('schema-org-structured-data');
    if (existing) {
      existing.remove();
    }
  });

  it('deve ser instanciado corretamente', () => {
    expect(service).toBeTruthy();
  });

  it('deve injetar o script JSON-LD do Schema.org no <head>', () => {
    service.injectStructuredData();

    const script = document.getElementById('schema-org-structured-data') as HTMLScriptElement;
    expect(script).toBeTruthy();
    expect(script.type).toBe('application/ld+json');

    const parsed = JSON.parse(script.text);
    expect(parsed['@context']).toBe('https://schema.org');
    expect(Array.isArray(parsed['@graph'])).toBe(true);
    expect(parsed['@graph'].length).toBe(4);
  });

  it('deve conter schemas validos para OnlineStore/LocalBusiness, ItemList de 4 produtos, HowTo e Categorias', () => {
    service.injectStructuredData();

    const script = document.getElementById('schema-org-structured-data') as HTMLScriptElement;
    const parsed = JSON.parse(script.text);
    const graph = parsed['@graph'];

    // 1. OnlineStore / LocalBusiness
    const store = graph.find(
      (item: { '@type': string | string[] }) =>
        item['@type'] === 'OnlineStore' ||
        (Array.isArray(item['@type']) && item['@type'].includes('OnlineStore'))
    );
    expect(store).toBeDefined();
    expect(store.name).toBe('Terra & Grão Cafés Especiais');
    expect(store.email).toBe('atendimento@terraegrao.com.br');

    // 2. ItemList com 4 cafés
    const itemList = graph.find(
      (item: { '@type': string; name?: string }) =>
        item['@type'] === 'ItemList' && item.name !== 'Categorias de Cafés Especiais e Acessórios'
    );
    expect(itemList).toBeDefined();
    expect(itemList.itemListElement.length).toBe(4);
    expect(itemList.itemListElement[0].item.name).toBe('Mantiqueira Dourada');
    expect(itemList.itemListElement[1].item.name).toBe('Reserva do Pouso');
    expect(itemList.itemListElement[2].item.name).toBe('Flor da Serra');
    expect(itemList.itemListElement[3].item.name).toBe('Geisha Edição Especial');

    // 3. HowTo
    const howTo = graph.find((item: { '@type': string }) => item['@type'] === 'HowTo');
    expect(howTo).toBeDefined();
    expect(howTo.name).toContain('Hario V60');

    // 4. ItemList de Categorias
    const categoriesSchema = graph.find(
      (item: { '@type': string; name?: string }) =>
        item['@type'] === 'ItemList' && item.name === 'Categorias de Cafés Especiais e Acessórios'
    );
    expect(categoriesSchema).toBeDefined();
    expect(categoriesSchema.itemListElement.length).toBe(5);
    expect(categoriesSchema.itemListElement[0].name).toBe('Café em Grãos');
  });

  it('nao deve duplicar o script caso injectStructuredData seja chamado mais de uma vez', () => {
    service.injectStructuredData();
    service.injectStructuredData();

    const scripts = document.querySelectorAll('#schema-org-structured-data');
    expect(scripts.length).toBe(1);
  });
});
