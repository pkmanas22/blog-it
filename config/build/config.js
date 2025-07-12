import { createRequire } from "module";
import path from "path";

import { absolutePath } from "./constants.js";

const require = createRequire(import.meta.url);

const alias = {
  images: path.resolve(process.cwd(), "app/assets/images"),
  crypto: require.resolve("crypto-browserify"),
  path: require.resolve("path-browserify"),
  buffer: require.resolve("buffer"),
  stream: require.resolve("stream-browserify"),

  src: absolutePath("src"),
  apis: absolutePath("src/apis"),
  common: absolutePath("src/common"),
  components: absolutePath("src/components"),
  constants: absolutePath("src/constants"),
  hooks: absolutePath("src/hooks"),
  translations: absolutePath("src/translations"),
  utils: absolutePath("src/utils"),

  neetoui: "@bigbinary/neetoui",
  "neetoui/*": "@bigbinary/neetoui/*",
  neetoicons: "@bigbinary/neeto-icons",
  "neetoicons/*": "@bigbinary/neeto-icons/*",
  neetocist: "@bigbinary/neeto-cist",
  "neetocist/*": "@bigbinary/neeto-cist/*",

  assets: absolutePath("../assets"),
};

export { alias };
