import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // ✅ Required for resolving aliases

export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0', // exposes server to your local network
        port: 5173,      // optional: fix to known port
      },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // ✅ Enables "@/components/..." syntax
        },
    },
});