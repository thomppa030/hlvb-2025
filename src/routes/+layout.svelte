<!-- src/routes/+layout.svelte -->
<script>
  import "../app.css";
  import Header from "$lib/components/ui/Header.svelte";
  import Footer from "$lib/components/ui/Footer.svelte";
  import StickyBookingForm from "$lib/components/ui/StickyBookingForm.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  let mounted = false;

  // Define which pages should show the sticky booking form
  const pagesWithStickyForm = [
    '/' // Only show on home page
  ];

  // Check if current page should show sticky form
  $: showStickyForm = pagesWithStickyForm.includes($page.url.pathname);

  onMount(() => {
    mounted = true;

    // Set initial theme - default to light mode
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      // Default to light mode instead of system preference
      document.documentElement.setAttribute("data-theme", "light");
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
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="app" class:mounted>
  <Header />
  {#if showStickyForm}
    <StickyBookingForm />
  {/if}
  <main>
    <slot />
  </main>
  <Footer />
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
    min-height: calc(100vh - 80px);
  }

  /* Prevent flash of unstyled content */
  :global(html) {
    background-color: #f6f4f3; /* 10% Sättigung Taupe hell */
  }

  :global([data-theme="dark"] html) {
    background-color: #2a251f; /* Lighter dark taupe */
  }
</style>
