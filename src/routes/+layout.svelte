<!-- src/routes/+layout.svelte -->
<script>
  import "../app.css";
  import Header from "$lib/components/ui/Header.svelte";
  import HeaderCentered from "$lib/components/ui/HeaderCentered.svelte";
  
  // Lazy load non-critical components
  const loadFooter = () => import("$lib/components/ui/Footer.svelte");
  const loadStickyForm = () => import("$lib/components/ui/StickyBookingForm.svelte");
  
  let Footer;
  let StickyBookingForm;
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";

  let mounted = false;
  let headerStyle = 'centered'; // 'default' or 'centered'

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

    // Load saved header style preference
    const savedHeaderStyle = localStorage.getItem("headerStyle");
    if (savedHeaderStyle && ['default', 'centered'].includes(savedHeaderStyle)) {
      headerStyle = savedHeaderStyle;
    } else {
      // Set default to centered if no saved preference
      headerStyle = 'centered';
    }
    
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

  function toggleHeaderStyle() {
    headerStyle = headerStyle === 'default' ? 'centered' : 'default';
    if (browser) {
      localStorage.setItem('headerStyle', headerStyle);
    }
  }
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
  <!-- Header Style Switcher -->
  {#if mounted}
    <div class="header-switcher">
      <button 
        class="switcher-btn" 
        on:click={toggleHeaderStyle}
        title="Switch header style"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
          <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" stroke-width="2"/>
          <line x1="12" y1="9" x2="12" y2="21" stroke="currentColor" stroke-width="2"/>
        </svg>
        <span>{headerStyle === 'default' ? 'Centered' : 'Default'} Header</span>
      </button>
    </div>
  {/if}

  <!-- Dynamic Header -->
  {#if headerStyle === 'centered'}
    <HeaderCentered />
  {:else}
    <Header />
  {/if}
  
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

  .header-switcher {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }

  .switcher-btn {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    background: var(--color-background-elevated);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    color: var(--color-text);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: all var(--transition-fast);
    box-shadow: var(--shadow-lg);
    backdrop-filter: blur(10px);
  }

  .switcher-btn:hover {
    background: var(--color-background);
    transform: translateY(-2px);
    box-shadow: var(--shadow-xl);
  }

  .switcher-btn:focus {
    outline: none;
    border-color: var(--color-secondary);
    box-shadow: 0 0 0 3px rgba(26, 74, 107, 0.1);
  }

  .switcher-btn svg {
    flex-shrink: 0;
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
