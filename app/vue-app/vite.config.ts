import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginSingleSpa from 'vite-plugin-single-spa'

// https://vite.dev/config/
export default defineConfig({
  // compilerOptions.isCustomElement add in vue
  plugins: [vue({
    template: {compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('my-')
    }}

  }),  vitePluginSingleSpa({
      type: 'mife',
      serverPort: 4101,
      spaEntryPoints: 'src/main.ts',
    })],
      server: {
    port: 4101,
    hmr: false
  },
})
