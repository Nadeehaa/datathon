import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist', // This will output the build files into the 'dist' folder
  },
  define: {
    'process.env': process.env, // Ensure that process.env is accessible in your code
  }
});
