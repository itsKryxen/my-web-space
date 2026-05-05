<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  let count = $state(0);
  let MAX = 10;

  let timer: ReturnType<typeof setTimeout>;

  function setTime() {
    timer = setTimeout(() => {
      if (count < MAX) {
        count++;
        setTime();
        return;
      }

      goto("/blogs");
    }, 1000);
  }
  onMount(() => {
    setTime();
    return () => {
      clearTimeout(timer);
    };
  });
</script>

<article
  class="prose prose-invert grid place-items-center min-w-screen h-screen content-center p-4"
>
  <h3 class="henny-penny-regular">IN PROGRESS</h3>
  <div class="max-w-[50vh] space-y-2">
    <p>
      I have some cool ideas to implement on this website. I don't want this to
      be a typical portfolio website. I want this to be my fun space on the
      internet, where I work on things I find fun to implement and build.
    </p>

    <p>
      While working on these cool projects, I plan to document my journey
      through blogs because it is fun and will help improve my writing skills.
    </p>
  </div>
  <a class="" href="/blogs">
    Go to blogs(<span class="text-fg/80">{MAX - count}</span>)
  </a>
</article>
