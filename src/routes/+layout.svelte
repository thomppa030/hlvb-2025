<!-- src/routes/+layout.svelte -->
<script>
  import "../app.css";
  import { onMount } from "svelte";

  let mounted = false;

  onMount(() => {
    mounted = true;

    // Set initial theme
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Handle system theme preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    function handleThemeChange(e) {
      if (!localStorage.getItem("theme")) {
        document.documentElement.setAttribute(
          "data-theme",
          e.matches ? "dark" : "light",
        );
      }
    }

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
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
    min-height: 100vh;
  }

  /* Prevent flash of unstyled content */
  :global(html) {
    background-color: #ffffff;
  }

  :global([data-theme="dark"] html) {
    background-color: #0a0a0a;
  }
</style>
