import { defineConfig } from 'vite';
import { baseConfig } from './vite.config';

// https://vitejs.dev/config/
export default defineConfig({
    ...baseConfig,
    base: '/',
    define: {
        ...baseConfig.define,
        __APP_TARGET__: '"netlify"',
    },
});
