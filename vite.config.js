import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { localApi } from './scripts/local-api.js';

// localApi() runs the files in /api during `npm run dev` and `npm run preview`,
// exactly like Vercel does in production. No Vercel login needed locally.
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
  return { plugins: [react(), localApi()] };
});
