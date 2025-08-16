<!-- src/routes/+layout.svelte -->
<script>
  import "../app.css";
  import Header from "$lib/components/ui/Header.svelte";
  import { onMount } from "svelte";

  let mounted = false;

  onMount(() => {
    mounted = true;

    // Set initial theme - simplified since Header now handles theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    }
  });
</script>

<svelte:head>
  <meta charset="utf-8" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="app" class:mounted>
  <Header />
  <main>
    <slot />
  </main>
</div>

<style>
  .app {
    min-height: 100vh;
    opacity: 0;
    transition: opacity var(--transition-normal);
  }

  .app.mounted {
    opacity: 1;
  }

  main {
    min-height: calc(100vh - 70px);
  }

  /* Prevent flash of unstyled content */
  :global(html) {
    background-color: #f6f4f3; /* 10% Sättigung Taupe hell */
  }

  :global([data-theme="dark"] html) {
    background-color: #1a1611; /* Dark taupe */
  }
</style>
