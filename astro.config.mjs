import { defineConfig } from 'astro/config';
import alpine from '@astrojs/alpinejs';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
    integrations: [alpine(), icon()],
    vite: {
        ssr: {
            external: ['svgo'],
        },
        plugins: [tailwindcss()],
    },
});
