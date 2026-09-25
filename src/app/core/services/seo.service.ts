import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { COFFEE_PRODUCTS } from '../data/coffee-catalog.mock';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly document = inject(DOCUMENT);

  /**
   * Injeta o script JSON-LD do Schema.org no <head> da aplicação.
   */
  injectStructuredData(): void {
    const scriptId = 'schema-org-structured-data';

    // Evita duplicidade se o script já estiver presente no DOM
    if (this.document.getElementById(scriptId)) {
      return;
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        this.getOrganizationSchema(),
        this.getProductListSchema(),
        this.getBrewingHowToSchema(),
        this.getCategoriesNavigationSchema(),
      ],
    };

    const script = this.document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    this.document.head.appendChild(script);
  }

  /**
   * Schema da Loja / Organização (dados cadastrais, localização e contato)
   */
  private getOrganizationSchema(): Record<string, unknown> {
    return {
      '@type': ['OnlineStore', 'LocalBusiness'],
      '@id': 'https://terra-grao.vercel.app/#organization',
      name: 'Terra & Grão Cafés Especiais',
      url: 'https://terra-grao.vercel.app',
      logo: '/images/logo.svg',
      description:
        'Cafés especiais cultivados em micro-lotes de altitude nas montanhas de Minas Gerais.',
      email: 'atendimento@terraegrao.com.br',
      priceRange: 'R$ 42,90 - R$ 189,90',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Minas Gerais',
        addressCountry: 'BR',
        streetAddress: 'Minas Gerais',
      },
      paymentAccepted: 'Cartão de Crédito, Boleto Bancário, Pix',
      currenciesAccepted: 'BRL',
    };
  }

  /**
   * Schema dos Produtos do Catálogo (para rich snippets no Google)
   */
  private getProductListSchema(): Record<string, unknown> {
    return {
      '@type': 'ItemList',
      itemListElement: COFFEE_PRODUCTS.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          image: product.image,
          description: `${product.name} - Café especial 100% arábica com ${product.shortTaste}. Torra artesanal semanal.`,
          brand: {
            '@type': 'Brand',
            name: 'Terra & Grão',
          },
          offers: {
            '@type': 'Offer',
            price: product.price.toFixed(2),
            priceCurrency: 'BRL',
            availability: 'https://schema.org/InStock',
            url: 'https://terra-grao.vercel.app/#catalogo',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewsCount ?? 1,
            bestRating: '5',
            worstRating: '1',
          },
        },
      })),
    };
  }

  /**
   * Schema do Guia de Preparo (HowTo para busca de tutoriais)
   */
  private getBrewingHowToSchema(): Record<string, unknown> {
    return {
      '@type': 'HowTo',
      name: 'Como Preparar Café Especial na Hario V60',
      description:
        'Guia de proporção e temperatura para extração perfeita de café especial artesanal.',
      totalTime: 'PT3M',
      supply: [
        {
          '@type': 'HowToSupply',
          name: '20g de Café Especial Moído',
        },
        {
          '@type': 'HowToSupply',
          name: '320ml de Água filtrada a 93°C',
        },
      ],
      step: [
        {
          '@type': 'HowToStep',
          name: 'Escaldar o filtro',
          text: 'Escalde o filtro de papel com água quente e descarte a água da jarra.',
        },
        {
          '@type': 'HowToStep',
          name: 'Pré-infusão',
          text: 'Adicione 20g de pó e despeje 50ml de água para liberar os aromas (30s).',
        },
        {
          '@type': 'HowToStep',
          name: 'Extração Contínua',
          text: 'Despeje o restante da água em círculos lentos até atingir 320ml.',
        },
      ],
    };
  }

  /**
   * Schema de Navegação de Categorias Principais (para SEO semântico e sitelinks)
   */
  private getCategoriesNavigationSchema(): Record<string, unknown> {
    const categories = [
      { name: 'Café em Grãos', url: 'https://terra-grao.vercel.app/#catalogo' },
      { name: 'Café Moído', url: 'https://terra-grao.vercel.app/#catalogo' },
      { name: 'Cafeteiras & Métodos', url: 'https://terra-grao.vercel.app/#calculadora' },
      { name: 'Moedores & Acessórios', url: 'https://terra-grao.vercel.app/#catalogo' },
      { name: 'Kits & Degustação', url: 'https://terra-grao.vercel.app/#catalogo' },
    ];

    return {
      '@type': 'ItemList',
      '@id': 'https://terra-grao.vercel.app/#categories',
      name: 'Categorias de Cafés Especiais e Acessórios',
      itemListElement: categories.map((cat, index) => ({
        '@type': 'SiteNavigationElement',
        position: index + 1,
        name: cat.name,
        url: cat.url,
      })),
    };
  }
}
