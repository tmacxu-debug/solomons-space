import { build } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const base = process.env.GITHUB_ACTIONS && repoName ? `/${repoName}/` : '/';

await build({
  root: process.cwd(),
  configFile: false,
  base,
  plugins: [react()],
  cacheDir: 'node_modules/.vite',
  resolve: {
    preserveSymlinks: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
