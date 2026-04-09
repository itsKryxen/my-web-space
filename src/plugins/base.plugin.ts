import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import { parse } from "node-html-parser";

//Add base html to all the files in the project
//merges the meta tag if exist in the html head , check if head exist and merge it with the base head
//only one head should be in the file , other head tags will be ignored

const REPLACE_STRING = "{{__BODY__}}";
const BASE = "app.html";

export function addBase(): Plugin {
  let root = "";
  return {
    name: "Html base",
    config(config, _env) {
      root = config.root ?? process.cwd();
    },
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        return mergeHtml(root, html);
      },
    },
  };
}

export function mergeHtml(root: string, page: string) {
  const basePath = path.join(root, BASE);

  if (!fs.existsSync(basePath)) {
    throw new Error("app.html not found");
  }
  const base = fs.readFileSync(basePath, "utf-8");
  const baseDoc = parse(base);
  const pageDoc = parse(page);

  const baseHead = baseDoc.querySelector("head");
  const pageHead = pageDoc.querySelector("head");

  const baseBody = baseDoc.querySelector("body");
  const pageBody = pageDoc.querySelector("body");

  if (!baseBody) {
    throw new Error("Base missing <body>");
  }

  if (!baseBody.innerHTML.includes(REPLACE_STRING)) {
    throw new Error("Missing {{__BODY__}} placeholder");
  }

  if (baseHead && pageHead) {
    baseHead.innerHTML += "\n" + pageHead.innerHTML;
  }

  const content = pageBody ? pageBody.innerHTML : page;
  baseBody.innerHTML = baseBody.innerHTML.replace(REPLACE_STRING, content);

  return baseDoc.toString();
}
