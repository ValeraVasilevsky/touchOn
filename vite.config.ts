import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader({
    defaultImport: 'component',
    svgoConfig: {
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false,
            },
          },
        },
      ],
    },
  }),],

  resolve: {
    alias: {
      app: fileURLToPath(new URL('./src/app', import.meta.url)),
      features: fileURLToPath(new URL('./src/features', import.meta.url)),
      shared: fileURLToPath(new URL('./src/shared', import.meta.url)),
      entities: fileURLToPath(new URL('./src/entities', import.meta.url)),
      widgets: fileURLToPath(new URL('./src/widgets', import.meta.url)),
      pages: fileURLToPath(new URL('./src/pages', import.meta.url)),
    },
  },

  server: {
    port: 8080,
  },

  css: {
    modules: {
      localsConvention: 'camelCase',
    },

    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "shared/ui/theme/variables.scss";
        `
      }
    }
  },
})
