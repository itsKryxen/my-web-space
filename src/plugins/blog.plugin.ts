import type { Plugin } from "vite";
import { parse } from "node-html-parser";
import { readFileSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { mergeHtml } from "./base.plugin";

const BLOGS_DIR = "src/blogs";
const TEMPLATE = "src/template.html";
const URL_PATH_START = "blog";
const TEMPLATE_REPLACE = "{{__content__}}";
const BLOG_SLUGS_ID = "virtual:blog-slugs";
const RESOLVED_BLOG_SLUGS_ID = "\0virtual:blog-slugs";
const BASE_TEMPLATE = "app.html";

type BlogPage = {
  slug: string;
  html: string;
};

export function transformBlogs(): Plugin {
  let pages: BlogPage[] = [];
  let root = "";
  let outDir = "";

  async function buildPages() {
    pages = await processFiles(root);
  }
  return {
    name: "blog transformer",
    enforce: "pre",
    resolveId(id) {
      if (id === BLOG_SLUGS_ID) return RESOLVED_BLOG_SLUGS_ID;
    },

    load(id) {
      if (id === RESOLVED_BLOG_SLUGS_ID) {
        return `export default ${JSON.stringify(
          pages.map((p) => ({
            slug: p.slug,
            url: `/${URL_PATH_START}/${p.slug}/`,
          })),
        )}`;
      }
    },

    async config(config, _env) {
      root = config.root ?? process.cwd();
      outDir = path.resolve(root, config.build?.outDir ?? "dist");
      await buildPages();
      const htmlEntries = await getHtmlEntries(root);
      return {
        build: {
          rolldownOptions: {
            input: {
              ...htmlEntries,
            },
          },
        },
      };
    },

    async handleHotUpdate(ctx) {
      const blogsPath = path.resolve(root, BLOGS_DIR);
      const templatePath = path.resolve(root, TEMPLATE);
      const baseTemplatePath = path.resolve(root, BASE_TEMPLATE);
      if (
        !ctx.file.startsWith(blogsPath) &&
        ctx.file !== templatePath &&
        ctx.file !== baseTemplatePath
      ) {
        return;
      }
      await buildPages();
      ctx.server.ws.send({
        type: "full-reload",
      });
      return [];
    },

    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const page = getPageForUrl(req.url, pages);
        if (page) {
          const html = mergeHtml(root, page.html);
          const transformed = await server.transformIndexHtml(req.url!, html);
          res.setHeader("Content-Type", "text/html");
          res.end(transformed);
          return;
        }
        rewriteBlogRequest(req, next);
      });
    },

    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewriteBlogRequest(req, next);
      });
    },

    async writeBundle() {
      const indexHtmlPath = path.join(outDir, "index.html");
      const indexHtml = await fs.readFile(indexHtmlPath, "utf-8");
      for (const page of pages) {
        const filePath = path.join(
          outDir,
          URL_PATH_START,
          page.slug,
          "index.html",
        );
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(
          filePath,
          createBuiltBlogHtml(root, page.html, indexHtml),
          "utf-8",
        );
      }
    },
  };
}

function rewriteBlogRequest(
  req: { url?: string },
  next: (error?: Error) => void,
) {
  const url = req.url?.split("?")[0];
  if (!url) {
    next();
    return;
  }
  const match = url.match(new RegExp(`^/${URL_PATH_START}/([^/]+)(\\.html)?$`));
  if (!match) {
    next();
    return;
  }
  req.url = `/${URL_PATH_START}/${match[1]}/`;
  next();
}

function getPageForUrl(url: string | undefined, pages: BlogPage[]) {
  const pathname = url?.split("?")[0];
  if (!pathname) return;

  const match = pathname.match(
    new RegExp(`^/${URL_PATH_START}/([^/]+?)(?:/|\\.html)?$`),
  );

  if (!match) return;

  return pages.find((page) => page.slug === match[1]);
}

function createBuiltBlogHtml(
  root: string,
  pageHtml: string,
  processedIndexHtml: string,
) {
  const builtDoc = parse(processedIndexHtml);
  const mergedDoc = parse(mergeHtml(root, pageHtml));

  const builtHead = builtDoc.querySelector("head");
  const builtBody = builtDoc.querySelector("body");
  const mergedHead = mergedDoc.querySelector("head");
  const mergedBody = mergedDoc.querySelector("body");

  if (!builtHead || !builtBody || !mergedBody) {
    throw new Error("Failed to construct built blog page");
  }

  builtHead.querySelectorAll("script").forEach((node) => node.remove());

  if (mergedHead) {
    const baseHead = parseBaseHead(root);
    const extraHeadNodes = mergedHead.childNodes.filter(
      (node) => !baseHead.includes(node.toString()),
    );

    if (extraHeadNodes.length > 0) {
      builtHead.innerHTML += `\n${extraHeadNodes.map((node) => node.toString()).join("\n")}`;
    }
  }

  builtBody.innerHTML = mergedBody.innerHTML;

  return builtDoc.toString();
}

function parseBaseHead(root: string) {
  const basePath = path.join(root, BASE_TEMPLATE);
  const baseDoc = parse(readFileSync(basePath, "utf-8"));
  const baseHead = baseDoc.querySelector("head");

  if (!baseHead) return [];

  return baseHead.childNodes.map((node) => node.toString());
}

async function getHtmlEntries(root: string): Promise<Record<string, string>> {
  const files = await fs.readdir(root);
  const entries: Record<string, string> = {};
  for (const file of files) {
    if (!file.endsWith(".html")) continue;
    if (file === "app.html") continue;
    const filePath = path.join(root, file);
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) continue;
    const name = file === "index.html" ? "index" : file.replace(/\.html$/, "");
    entries[name] = filePath;
  }
  return entries;
}

async function processFiles(root: string): Promise<BlogPage[]> {
  const dir = path.resolve(root, BLOGS_DIR);
  const templatePath = path.resolve(root, TEMPLATE);
  const files = await fs.readdir(dir);
  const template = await fs.readFile(templatePath, "utf-8");
  const pages: BlogPage[] = [];
  for (const file of files) {
    if (!file.endsWith(".html")) continue;
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) continue;
    const raw = await fs.readFile(filePath, "utf-8");
    const doc = parse(raw);
    const config = doc.querySelector("config");
    if (!config) {
      throw new Error(`Missing <config> in ${file}`);
    }
    const slug = config.getAttribute("slug");
    if (!slug) {
      throw new Error(`Missing slug in ${file}`);
    }
    config.remove();
    const body = doc.querySelector("body");
    const htmlContent = body ? body.innerHTML : doc.toString();
    const finalHtml = template.replace(TEMPLATE_REPLACE, htmlContent);
    pages.push({
      slug,
      html: finalHtml,
    });
  }

  return pages;
}
