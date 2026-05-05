type BlogModule = {
  meta?: {
    title?: string;
    description?: string;
    date?: string;
  };
};

export const load = async () => {
  const modules = import.meta.glob<BlogModule>("../blog/**/meta.ts", {
    eager: true,
  });

  const posts = Object.entries(modules)
    .filter(([path]) => path !== "../blog/+page.svelte")
    .map(([path, module]) => {
      const slug = path.replace("../blog/", "").replace("/meta.ts", "");
      return {
        title: module.meta?.title ?? slug,
        description: module.meta?.description ?? "",
        date: module.meta?.date ?? "",
        href: `/blog/${slug}`,
      };
    });
  // .sort((a, b) => b.date.localeCompare(a.date));

  return {
    posts,
  };
};
