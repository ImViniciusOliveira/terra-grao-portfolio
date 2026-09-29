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
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use(async (req, res, next) => {
  try {
    const response = await angularApp.handle(req);
    if (!response) {
      return next();
    }

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
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
