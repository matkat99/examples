import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path';


export default defineConfig({
  root: "src/",
plugins: [svelte()],
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        profile: resolve(__dirname, "src/profile/index.html"),
        
      },
    },
  },
});