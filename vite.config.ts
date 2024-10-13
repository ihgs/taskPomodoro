import {VitePWA} from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES
    ? "/taskPomodoro/"
    : "./",
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      includeAssets:[
        'offline.html',
        'favicon.svg',
        'favicon.ico',
        'rebots.txt',
        'apple-touch-icon.png',
      ],
      manifest: {
        "theme_color": "#f69435",
        "background_color": "#f69435",
        "display": "standalone",
        "scope": "https://ihgs.github.io/taskPomodoro/",
        "start_url": ".",
        "name": "taskPomodoro",
        "short_name": "taskPomodoro",
        "icons": [
            {
                "src": "/taskPomodoro/icon-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/taskPomodoro/icon-256x256.png",
                "sizes": "256x256",
                "type": "image/png"
            },
            {
                "src": "/taskPomodoro/icon-384x384.png",
                "sizes": "384x384",
                "type": "image/png"
            },
            {
                "src": "/taskPomodoro/icon-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ]
      }
    })
  ],
})
