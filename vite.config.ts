import {defineConfig} from 'vite';
export default defineConfig({base:'./',build:{outDir:'dist',rollupOptions:{output:{manualChunks(id){if(id.includes('hero-map.json'))return 'geography'}}}}});
