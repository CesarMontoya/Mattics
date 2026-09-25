// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import node from '@astrojs/node';


// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  site: 'https://mattics.xyz',
  output: "server",
  // Dokploy sirve detrás de un proxy y Astro bloquea los POST de formularios
  // cuando Origin no coincide con Host. Panel admin de uso interno con
  // sesión Supabase en cookies HttpOnly SameSite=Lax.
  security: {
    checkOrigin: false,
  },
  integrations: [react()],
  adapter: node({
    mode: 'standalone'
  })
});