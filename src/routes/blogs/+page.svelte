<script lang="ts">
  import { formatDate } from "$lib/utils";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<section class="prose prose-invert">
  <h3 class="font-bold -mb-2 henny-penny-regular">
    Hello, I'm <span class="font-bold">Kryxen</span>
  </h3>
  <p class="text-fg/60">
    A CS student building weird web, systems, and random experiments.
  </p>

  <p class="-mt-2">
    This is the place where I put projects that were fun to build. I plan on
    putting the things I work on here whenever possible. WebAssembly has made a
    lot of things possible on the web, so I can put a lot of cool things I build
    here — at least cool to me. I also plan to write blogs about the process and
    the technical aspects behind them.
  </p>
</section>
<br />
<div class="prose-invert prose">
  <h1
    class="mt-2 henny-penny-regular mb-2 underline decoration-fg/40 underline-offset-8"
  >
    Blogs
  </h1>
  {#each data.posts as post}
    <article class="p-4 group">
      <a href={post.href}>
        <h2 class="henny-penny-regular mt-0">
          {post.title}
        </h2>
      </a>

      <div
        class=" border-l border-fg/20 pl-4 transition-all duration-300
				group-hover:border-primary/70"
      >
        {#if post.description}
          <p class="m-0 line-clamp-4 text-sm text-muted">
            {post.description}
          </p>
        {/if}

        {#if post.date}
          <time class="text-sm text-fg/60" datetime={post.date}>
            {formatDate(post.date)}
          </time>
        {/if}
      </div>
    </article>
  {/each}
</div>
