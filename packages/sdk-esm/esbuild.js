import { build } from 'esbuild'
import packageJson from './package.json'
const { dependencies = {}, peerDependencies = {} } = packageJson

// see https://souporserious.com/bundling-typescript-with-esbuild-for-npm/
// NOTE: esbuild auto-detects TypeScript and loads tsconfig.json

const shared = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  sourcemap: true,
  minify: true,
  target: ['esnext'],
  platform: 'node',
  external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)]
}

// browser async build:
build({
  ...shared,
  outdir: 'dist/browser', // could also use outfile: 'dist/index.js'
  format: 'iife'
}).catch(() => process.exit(1))

// esm async build:
build({
  ...shared,
  outdir: 'dist/esm', // could also use outfile: 'dist/index.esm.js'
  splitting: true,
  format: 'esm'
}).catch(() => process.exit(1))
