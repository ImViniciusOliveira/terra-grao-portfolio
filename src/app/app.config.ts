import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ApplicationConfig,
  inject,
  PLATFORM_ID,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  REQUEST,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';


/**
 * Configuração Global da Aplicação Angular (Providers e Inicializadores)
 */

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Configuração do Roteador com garantia de rolagem sempre no topo da página
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'disabled',
      })
    ),
    // Hidratação do cliente com captura de eventos pré-inicialização (Melhoria de INP)
    provideClientHydration(withEventReplay()),

    // Inicialização da Aplicação (Executado antes da renderização dos componentes)
    provideAppInitializer(() => {
      const platformId = inject(PLATFORM_ID);
      const document = inject(DOCUMENT);

      if (isPlatformBrowser(platformId)) {
        // Desativa a restauração automática de rolagem do navegador para evitar pulos no F5
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);

        // Garante reset de posição antes do salvamento de histórico na saída da página
        window.addEventListener('beforeunload', () => {
          window.scrollTo(0, 0);
        });

        // Sincroniza a classe 'dark' no navegador com base no cookie de preferência do usuário
        const isDark = document.cookie.includes('theme=dark');
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else {
        // No Servidor (SSR): Lê o cabeçalho Cookie da requisição HTTP e injeta a classe 'dark'
        const request = inject(REQUEST, { optional: true });
        if (request) {
          const cookieHeader = request.headers.get('cookie') || '';
          if (cookieHeader.includes('theme=dark')) {
            document.documentElement.classList.add('dark');
          }
        }
      }
    }),
  ],
};
