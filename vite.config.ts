import { defineConfig, normalizePath } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import path from "path";

export default defineConfig({
  base: process.env.BASE_PATH,
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
    // alias: [{ find: "@/renderer", replacement: "/src/renderer/" }],
  },
  css: {
    modules: {
      generateScopedName: "[folder]__[local]___[hash:base64:5]",
    },
  },
  optimizeDeps: {
    entries: ["./index.html"],
  },
  plugins: [
    // svgr(),
    react(),
  ],
  build: {
    // 默认:
    // 如果静态资源体积 >= 4KB，则提取成单独的文件
    // 如果静态资源体积 < 4KB，则作为 base64 格式的字符串内联
    // 这里设置为 8 KB
    // assetsInlineLimit: 8 * 1024,
    // minify: false,
    target: "modules",
    sourcemap: true,
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    proxy: {
      "/dc": {
        // target: 'http://192.168.11.251:8080/dc',
        target: "https://dc.pisces.neuralgalaxy.cn/dc",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dc/, ""),
      },
    },
  },
});
