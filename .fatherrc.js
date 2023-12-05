import { defineConfig } from 'father';

export default defineConfig({
  plugins: ['@rc-component/father-plugin'],
  esm: { ignores: ['src/cli/**'] }
});
