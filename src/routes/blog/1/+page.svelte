<script lang="ts">
  import { meta } from "./meta.ts";
  import { formatDate } from "$lib/utils";
</script>

<article class="prose max-w-none prose-invert">
  <h1 class="henny-penny-regular text-center" id="toc:title">
    Putting Fun to Use
  </h1>
  <p class="text-center text-sm italic opacity-70">
    Published on <time datetime={meta.date}>{formatDate(meta.date)}</time>
  </p>

  <p>
    As developers, we often build things that do not necessarily solve a
    problem. Sometimes, it is just fun to write code and watch it turn into
    something cool. I get a great feeling when I build something that actually
    works, especially when I wrote it from scratch or with very few
    abstractions. This is my attempt to chase that feeling while turning the
    results into a showcase.
  </p>

  <h2 id="toc:why" class="">Why This Exists</h2>
  <p>
    I am still a college student, and I like to code. By that, I mean I enjoy
    actually writing the code, understanding the system, debugging it, and
    seeing the result work. I do not have much professional coding experience
    yet, so I need other ways to prove that I can build things seriously.
  </p>

  <p>
    When I started coding for fun around 2020, I believed that solid coding
    skills and a few good projects could help me get a job doing something I
    enjoy. That may still be true, but the standard for what counts as a good
    project has changed.
  </p>

  <h2 id="toc:generic-projects">Generic Projects Are Not Enough</h2>

  <p>
    Many common portfolio projects no longer say much by themselves. With modern
    LLM tools, a generic app can be generated, patched, and presented without
    the person behind it understanding much of the system. This does not make
    LLMs bad, but it does make shallow projects less useful as proof of skill.
  </p>

  <p>
    There was always a version of this problem. Before LLMs, people cloned
    projects from GitHub, changed a few things, and put them on resumes. At
    least that usually forced them to set up the environment, run the project,
    debug something, and understand part of the stack. With LLMs, it is easier
    to skip even that. I want the project here to be built purely by myself
    without LLMs, understanding each part and seeing the code produce something
    cool.
  </p>

  <p>
    That is not the kind of work I want this website to show. I want the
    projects here to show that I built them myself.
  </p>
  <h2 id="toc:so-what">What I Want to Prove</h2>
  <p>
    Well, I plan to get employed at some point. I would like to be in an
    environment where I get paid well, obviously, and where I can be surrounded
    by highly skilled people who peer-pressure me to learn new things every day.
  </p>

  <p>
    But if I want to get to that position, I need to prove myself worthy of that
    position. I need to make something presentable that is unique enough and
    also fun for me to do.
  </p>

  <p>
    It is not every day that you find a problem that you think needs to be
    solved. Often, someone already made a project to solve that problem. Maybe
    you can improve it? If it is open source, just make a PR. If it is not open
    source, lucky you: you got one more project on your todo list, which might
    become great software you can be proud of.
  </p>
  <h2 id="toc:the-plan">The Plan</h2>
  <p>
    I plan on making this website showcase the things I recreated without
    LLM-generated code, which I find cool, and I would like to integrate them if
    possible.
  </p>

  <p>
    But not everything can run on the web, right? Well, the web has come a long
    way with WebAssembly. Though I cannot put everything I make here, I can put
    enough things here to create a solid showcase for future interviews and
    recruiters. That is the plan, at least. Even if the job part fails, I can
    brag about building a cool project. More importantly, the knowledge gained
    from building all of those things will be insane.
  </p>
  <h2 id="toc:the-start">Starting With a Browser Shell</h2>

  <p>
    I want to start with a shell in the browser. <span class="font-bold"
      >A shell in the browser?</span
    > Yeah, but how?
  </p>

  <p>
    I plan to simulate a shell in the browser, so I need to write a simulation
    layer for the parts of the OS that a shell normally talks to: files, paths,
    environment variables, standard streams, exit codes, and eventually
    process-like behavior. That should be a lot of fun to build.
  </p>

  <p>
    I plan on writing the core in Rust and compiling it to WASM. Then I can
    build a terminal-like interface around it, something like a tiny version of
    xterm.js. Damn, there are a lot of exciting parts here.
  </p>

  <p>
    While building it, I also want to write posts about the process. That should
    help me improve my ability to explain technical work, which matters if I
    want to work well on real teams. This page is only the overview; the deeper
    write-ups can live in a separate blog section.
  </p>
</article>
