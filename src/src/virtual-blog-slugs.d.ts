type BlogSlugEntry = {
  slug: string;
  url: string;
};

declare module "virtual:blog-slugs" {
  const blogSlugs: BlogSlugEntry[];
  export default blogSlugs;
}
