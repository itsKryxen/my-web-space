<script lang="ts">
	import SocialInfo from './socialInfo.svelte';
	import { afterNavigate } from '$app/navigation';
	import { tick } from 'svelte';
	let { children } = $props();
	let contentEl: HTMLElement;
	let toc: {
		id: string;
		label: string;
		level: number;
	}[] = $state([]);
	function buildToc() {
		if (!contentEl) return;

		const headings = contentEl.querySelectorAll<HTMLElement>(
			'h1[id^="toc:"], h2[id^="toc:"], h3[id^="toc:"], h4[id^="toc:"], h5[id^="toc:"], h6[id^="toc:"]'
		);

		toc = Array.from(headings).map((heading) => {
			return {
				id: heading.id,
				label: heading.textContent?.trim() ,
				level: Number(heading.tagName.slice(1))
			};
		});
	}
	afterNavigate(async () => {
		await tick();
		buildToc();
	});
</script>
<svelte:head>
	<title>Blogs | Kryxen.dev</title>
</svelte:head>


<div class="min-h-screen px-4 py-6 md:px-8">
	<div class="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row">
		<div class="shrink-0 md:sticky md:top-6 md:h-fit md:w-56">
			<nav class="">
				<a
					href="/"
					class="henny-penny-regular block text-center text-5xl leading-none hover:underline md:text-left"
				>
					kryxen.dev
				</a>

				<div class="mt-5 flex justify-center md:justify-start">
					<SocialInfo />
				</div>
			</nav>
      	{#if toc.length > 0}
		<div class="mt-8 hidden md:block">
			<p class="mb-3 text-xs font-semibold uppercase tracking-widest text-fg/90">
				On this page
			</p>

			<ul class="space-y-2 text-sm">
				{#each toc as item}
					<li
						class={
							[1,2].includes(item.level)
								? ''
								: item.level === 3
									? 'ml-3'
									: item.level === 4
										? 'ml-6'
										: 'ml-8'
						}
					>
						<a href={`#${item.id}`} class="{item.level==1? "text-fg/80" :"text-fg/60"} hover:text-primary">
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
		</div>

		<main bind:this={contentEl} class="min-w-0 flex-1">
			<div class="max-w-3xl items-center">
				{@render children()}
			</div>
		</main>
	</div>
</div>

