import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// Output to build/ so the GitHub Pages workflow's paths stay the same.
export default defineConfig({
    plugins: [react()],
    build: {outDir: 'build'},
});
