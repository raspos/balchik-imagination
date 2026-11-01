import {defineConfig} from 'vite';
export default defineConfig({base:'./',build:{outDir:'dist',rollupOptions:{input:{main:'index.html',japanese:'ja/index.html'},output:{manualChunks(id){if(id.includes('hero-map.json'))return 'geography'}}}}});
