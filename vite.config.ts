import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export const baseConfig = {
    plugins: [react()],
    base: '/lagrange-data/',
    define: {
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
        __APP_TARGET__: '"gh-pages"',
    },
    assetsInclude: [
        'assets/mapExamples/*.txt',
    ],
};

export default defineConfig(baseConfig);
