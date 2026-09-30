// Local stand-in for Vercel Functions: /api/<name> -> api/<name>.js default export.
// Adds the same helpers Vercel gives you: req.query, req.body, res.status(), res.json().
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => (data += c));
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : undefined); } catch { resolve(data); }
    });
  });
}

function middleware(load) {
  return async (req, res, next) => {
    const url = new URL(req.url, 'http://localhost');
    if (!url.pathname.startsWith('/api/')) return next();
    const name = url.pathname.replace(/^\/api\//, '').replace(/\/$/, '');
    const file = path.resolve('api', `${name}.js`);
    if (name.startsWith('_') || !fs.existsSync(file)) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: `No API route /api/${name}` }));
    }
    req.query = Object.fromEntries(url.searchParams);
    req.body = await readBody(req);
    res.status = (code) => { res.statusCode = code; return res; };
    res.json = (obj) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(obj, null, 2));
      return res;
    };
    try {
      const mod = await load(file);
      await mod.default(req, res);
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: err.message }));
    }
  };
}

export function localApi() {
  return {
    name: 'local-vercel-api',
    configureServer(server) {
      server.middlewares.use(middleware((f) => server.ssrLoadModule(f)));
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware((f) => import(pathToFileURL(f).href)));
    },
  };
}
