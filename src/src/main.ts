import "./style.css";
import blogSlugs from "virtual:blog-slugs";

const links = blogSlugs
  .map((page) => `<li><a href="${page.url}">${page.slug}</a></li>`)
  .join("");

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<section id="blog-links">
  <h2>Blogs</h2>
  <ul>${links}</ul>
</section>

<div class="ticks"></div>
<section id="spacer"></section>

`;
