import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@theme/v0'; // Keep your existing tailwind plugin name
import path from 'path'; // CRUCIAL: You must import this!

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ''); // Use process.cwd() for Vercel
  
  return {
    plugins: [react(), tailwindcss()],
    define: {
      // Prevents "process is not defined" error in the browser
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
    },
    resolve: {
      alias: {
        // This ensures '@' always points to your root directory
        '@': path.resolve(__dirname, './'),
      },
    },
    server: {
      // Keep your AI Studio HMR settings
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      // Tells Vite to ignore the annoying node-domexception during the build
      rollupOptions: {
        external: ['node-domexception'],
      },
    },
  };
});
