import { defineConfig } from "vite-plus";
import tailwindcss from "@tailwindcss/vite";
import { addBase } from "./plugins/base.plugin";
import { transformBlogs } from "./plugins/blog.plugin";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  lint: { options: { typeAware: true, typeCheck: true } },
  plugins: [addBase(), transformBlogs(), tailwindcss()],
  appType: "mpa",
});
