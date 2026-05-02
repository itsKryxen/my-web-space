<script lang="ts">
</script>

<article class="prose flex max-w-none flex-col gap-4 prose-invert">
	<h1 class="henny-penny-regular text-center" id="toc:title">Putting Fun to Use</h1>

	<p>
		As developers, we often build things that do not necessarily solve a problem. Sometimes, it is
		just fun to write code and watch it turn into something cool. I get a great feeling when I build
		something that actually works, especially when I wrote it from scratch or with very few
		abstractions. This is my attempt to chase that feeling while turning the results into a
		technical showcase.
	</p>

	<h2 id="toc:the-situation" class="">The Situation as I See It</h2>
	<p>
		I am still a college student, and I like to code. By that, I mean actually writing the code, not
		generating it. However, I lack professional coding experience. The situation today is different
		from when I started coding for fun around 2020. Back then, I hoped that having solid coding
		skills and a few good projects would help me land a job doing something I love. That may still
		be true, or it may not be.
	</p>

	<p>
		These days, because of subsidized LLM tools, the same metrics do not mean as much anymore. Many
		generic projects can now be generated easily.
	</p>

	<p>
		The same argument can be made for the projects people cloned from GitHub to put on their resumes
		pre LLM era, but at least they learned something, like cloning it and making some changes to
		make it look less obvious. They might have learned something, like how to set up the env and run
		it, and might have debugged something when setting the env. I assume they put some effort into
		making it less obvious. They did, right?
	</p>

	<p>
		But with LLMs, people just prompt, take a screenshot, give it to an LLM, and ask it to fix it,
		not learning anything. They have no idea about the setup they are using, not even basic Git
		understanding. At least, this is what I have observed around me.At least, that is what I have
		observed around me.
	</p>
	<h2 id="toc:so-what">So What</h2>
	<p>
		Well, I plan to get employed at some point. I would like to be in an environment where I get
		paid well, obviously, and where I can be surrounded by highly skilled people who peer-pressure
		me to learn new things every day.
	</p>

	<p>
		But if I want to get to that position, I need to prove myself worthy of that position. I need to
		make something presentable that is unique enough and also fun for me to do.
	</p>

	<p>
		It is not every day that you find a problem that you think needs to be solved. Often, someone
		already made a project to solve that problem. Maybe you can improve it? If it is open source,
		just make a PR. If it is not open source, lucky you: you got one more project on your todo list,
		which might become great software you can be proud of.
	</p>
	<h2 id="toc:the-plan">the plan</h2>
	<p>
		I plan on making this website showcase the things I recreated without LLM-generated code, which
		I find cool, and I would like to integrate them if possible.
	</p>

	<p>
		But not everything can run on the web, right? Well, the web has come a long way with
		WebAssembly. Though I cannot put everything I make here, I can put enough things here to create
		a solid showcase for future interviews and recruiters. That is the plan, at least. Even if the
		job part fails, I can brag about building a cool project. More importantly, the knowledge gained
		from building all of those things will be insane.
	</p>
	<h2 id="toc:the-start">The Start</h2>

	<p>I want to start with a shell in the browser. A shell in the browser? Yeah, but how?</p>

	<p>
		I plan to simulate a shell in the browser, so I need to write a simulation layer for the parts
		of the OS that a shell normally talks to: files, paths, environment variables, standard streams,
		exit codes, and eventually process-like behavior. That should be a lot of fun to build.
	</p>

	<p>
		I plan on writing the core in Rust and compiling it to WASM. Then I can build a terminal-like
		interface around it, something like a tiny version of xterm.js. Damn, there are a lot of
		exciting parts here.
	</p>

	<p>
		While working on this, I plan on writing blog posts about the process. That should help me
		improve my explanation skills, which is important for a developer who wants to work on team
		projects. I plan to create a separate blog for it, so this section is brief overview.
	</p>
</article>
