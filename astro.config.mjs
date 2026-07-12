// @ts-check
import { defineConfig ,fontProviders } from 'astro/config';


// https://astro.build/config
export default defineConfig({
    fonts: [{
        provider: fontProviders.google(),
        name:'DotGothic16',
        cssVariable:'--font-dotgothic16',
        weights: [400],
        fallbacks:['Courier New', 'monospace'],
    },
    {
        provider: fontProviders.google(),
        name:'Zen Kaku Gothic New',
        cssVariable:'--font-zen-kaku',
        weights: [400,500,700],
        fallbacks:['system-ui','sans-serif'],
    },
]

});