<!-- src/routes/+layout.svelte -->
<script>
  import "../app.css";
  import HeaderCentered from "$lib/components/ui/HeaderCentered.svelte";
  import Footer from "$lib/components/ui/Footer.svelte";
  import StickyBookingForm from "$lib/components/ui/StickyBookingForm.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { currentLanguage } from "$lib/stores/i18n.js";

  let mounted = false;

  // Define which pages should show the sticky booking form
  const pagesWithStickyForm = [
    '/', // German home page
    '/en' // English home page
  ];

  // Check if current page should show sticky form
  $: showStickyForm = pagesWithStickyForm.includes($page.url.pathname);

  // Set language based on URL
  $: if ($page.url.pathname.startsWith('/en')) {
    currentLanguage.switchTo('en');
  } else {
    currentLanguage.switchTo('de');
  }

  onMount(() => {
    mounted = true;
    // Force light mode only
    document.documentElement.setAttribute("data-theme", "light");
    // Initialize language store
    currentLanguage.init();
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

</style>
