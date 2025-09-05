import type { Plugin } from '@cloudflare/pages-plugin-nextjs';

export const nextjsPlugin: Plugin = {
  name: 'nextjs',
  enabled: true,
  config: {
    distDir: '.next',
  },
};