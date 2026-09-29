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

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'disabled',
      })
    ),
    provideClientHydration(withEventReplay()),
    provideAppInitializer(() => {
      const platformId = inject(PLATFORM_ID);
      const document = inject(DOCUMENT);

      if (isPlatformBrowser(platformId)) {
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
        window.addEventListener('beforeunload', () => {
          window.scrollTo(0, 0);
        });

        const isDark = document.cookie.includes('theme=dark');
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else {
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
