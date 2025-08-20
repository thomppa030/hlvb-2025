<!-- src/routes/+layout.svelte -->
<script>
  import "../app.css";
  import HeaderCentered from "$lib/components/ui/HeaderCentered.svelte";
  
  // Lazy load non-critical components
  const loadFooter = () => import("$lib/components/ui/Footer.svelte");
  const loadStickyForm = () => import("$lib/components/ui/StickyBookingForm.svelte");
  
  let Footer;
  let StickyBookingForm;
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  let mounted = false;

  // Define which pages should show the sticky booking form
  const pagesWithStickyForm = [
    '/', // German home page
    '/en' // English home page
  ];

  // Check if current page should show sticky form
  $: showStickyForm = pagesWithStickyForm.includes($page.url.pathname);

  onMount(async () => {
    mounted = true;

    // Force light mode only
    document.documentElement.setAttribute("data-theme", "light");
    
    // Load additional font weights asynchronously
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;600;700&family=Crimson+Text:wght@600;700&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
    
    // Lazy load non-critical components after initial render
    const [footerModule, stickyFormModule] = await Promise.all([
      loadFooter(),
      loadStickyForm()
    ]);
    Footer = footerModule.default;
    StickyBookingForm = stickyFormModule.default;
  });
</script>

<svelte:head>
  <meta charset="utf-8" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <!-- Additional fonts loaded programmatically to avoid render-blocking -->
  <noscript>
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;600;700&family=Crimson+Text:wght@600;700&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />
  </noscript>
</svelte:head>

<div class="app" class:mounted>
  <!-- Always use HeaderCentered -->
  <HeaderCentered />
  
  {#if showStickyForm && StickyBookingForm}
    <svelte:component this={StickyBookingForm} />
  {/if}
  <main>
    <slot />
  </main>
  {#if Footer}
    <svelte:component this={Footer} />
  {/if}
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

</style>
