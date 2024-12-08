import * as esbuild from 'esbuild'
import { execSync } from 'child_process'

// Build the main package
await esbuild.build({
  entryPoints: ['./src/index.ts', './src/cli/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outdir: './dist',
  packages: 'external',
  sourcemap: true,
  resolveExtensions: ['.ts', '.js'],
  outExtension: { '.js': '.js' }
})

// Build type declarations separately since esbuild doesn't handle them
execSync('tsc --emitDeclarationOnly --declaration', { stdio: 'inherit' }) 