import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

/** @type {import("@sveltejs/vite-plugin-svelte").SvelteConfig} */
const config = {
    preprocess: [
        vitePreprocess({
            style: true,
            script: false
        })
    ]
}

export default config;
