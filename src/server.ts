import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Servidor de arquivos estáticos da pasta /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Middleware de renderização do Angular SSR com interceptação de tema via Cookie
 */
app.use(async (req, res, next) => {
  try {
    const response = await angularApp.handle(req);
    if (!response) {
      return next();
    }

    // Intercepta a requisição HTTP: se contiver o cookie theme=dark, injeta class="dark" na tag html
    const cookieHeader = req.headers.cookie || '';
    if (cookieHeader.includes('theme=dark')) {
      const html = await response.text();
      const updatedHtml = html.replace('<html lang="pt-BR">', '<html lang="pt-BR" class="dark">');
      res.status(response.status);
      response.headers.forEach((val, key) => {
        if (key.toLowerCase() !== 'content-length') {
          res.setHeader(key, val);
        }
      });
      res.send(updatedHtml);
      return;
    }

    await writeResponseToNodeResponse(response, res);
  } catch (err) {
    next(err);
  }
});

/**
 * Inicialização do servidor Node/Express (porta padrão: 4000)
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Servidor Node Express ativo em http://localhost:${port}`);
  });
}

/**
 * Manipulador de requisições exportado para o Angular CLI dev-server ou rotas serverless
 */
export const reqHandler = createNodeRequestHandler(app);
