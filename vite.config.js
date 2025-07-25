import { mergeDeepRight } from "ramda";
import { alias } from "./config/build/config";
import { define, entryPoints, extensions } from "./config/build/constants";
import svgr from "vite-plugin-svgr";
import babel from "vite-plugin-babel";
const postCssConfig = require("./postcss.config");

const port = process.env.DEVSERVER_PORT || 8000;

const baseConfig = {
  assetsInclude: ["**/*.yaml"],
  css: { postcss: postCssConfig },
  server: { port, origin: `http://localhost:${port}` },
  build: {
    manifest: true,
    sourcemap: true,
    cssCodeSplit: false,
  },
  root: "app/javascript/packs",
  resolve: {
    alias,
  },
  define,
  plugins: [
    svgr({
      svgrOptions: { exportType: "default" },
      include: "**/*.svg",
    }),
    babel(),
  ],
};

const viteConfig = mergeDeepRight(baseConfig, {
  resolve: {
    alias,
    extensions,
  },
  rollupOptions: { input: entryPoints },
});

module.exports = viteConfig;
