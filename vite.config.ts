import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// GitHub Pages serves the app from /<repo>/, so CI sets BASE_PATH.
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Bolo — Learn Bangla',
        short_name: 'Bolo',
        description: 'Learn to speak Bangladeshi Bangla with your family, in Banglish.',
        theme_color: '#131f24',
        background_color: '#131f24',
        display: 'standalone',
        orientation: 'portrait',
        start_url: base,
        scope: base,
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,json}'],
        // Audio is cached on demand; only the Latin font subsets are needed offline.
        globIgnores: ['audio/**', '**/nunito-cyrillic*', '**/nunito-vietnamese*'],
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            // Audio is cached the first time it plays (or via "Download audio" in settings).
            urlPattern: ({ url }) => url.pathname.includes('/audio/') && url.pathname.endsWith('.mp3'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'bolo-audio',
              expiration: { maxEntries: 5000 },
              rangeRequests: true,
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
});
