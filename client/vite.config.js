import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.fbx', '**/*.png'],
  server: {
    port: 3000,
  },
  plugins: [react()],
});
