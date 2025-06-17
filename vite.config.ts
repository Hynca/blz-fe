import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint2';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        eslint(),
        checker({
            typescript: true,
            terminal: true
        })
    ],
    resolve: {
        alias: {
            // Define base directory as src to enable imports from 'store/...'
            store: path.resolve(__dirname, './src/store'),
            // Add more aliases as needed for other directories
            src: path.resolve(__dirname, './src'),
            components: path.resolve(__dirname, './src/components')
        }
    }
});
