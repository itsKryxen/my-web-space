<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<section class="space-y-6">
	<div>
		<h1 class="font-bold tracking-tight">
			Hello, I'm <span class="font-bold">Kryxen</span>
		</h1>
		<p class="text-fg/60">A CS student building weird web, systems, and random experiments.</p>
	</div>

	<div class="space-y-4 text-sm leading-7 text-fg/80">
		<p>
			This is the place where I put projects that mostly solve nothing, but I worked on them because
			they were fun to build and a good learning experience.
		</p>

		<p>
			I plan on putting the things I work on here. The web has come a long way because of
			WebAssembly, which makes it possible to put a lot of cool things I build on the web — at least
			cool to me.
		</p>
	</div>
</section>

<div class="mt-6 space-y-4">
	{#each data.posts as post}
		<a
			href={post.href}
			class="block space-y-2 rounded-lg border border-white/10 p-4 hover:bg-white/5"
		>
			<h2 class="henny-penny-regular text-xl font-bold">{post.title}</h2>

			{#if post.description}
				<p class="text-sm text-muted">{post.description}</p>
			{/if}

			{#if post.date}
				<p class="text-sm text-muted">{post.date}</p>
			{/if}
		</a>
	{/each}
</div>
