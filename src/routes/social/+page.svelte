<!-- src/routes/social/+page.svelte -->
<script>
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  let scriptLoaded = false;
  let showWidget = false;

  onMount(() => {
    if (browser) {
      // Check if this is the first visit (not a refresh)
      const hasRefreshed = sessionStorage.getItem("social-page-refreshed");
      console.log("Has refreshed:", hasRefreshed);

      if (!hasRefreshed) {
        console.log("First visit detected, refreshing page...");
        // First visit - set flag and refresh
        sessionStorage.setItem("social-page-refreshed", "true");
        location.reload();
        return;
      }

      console.log("Page already refreshed, loading Aadvanto widget script...");

      // Check if script already exists
      const existingScript = document.querySelector(
        'script[src*="aadvanto.com"]',
      );
      if (existingScript) {
        showWidget = true;
        return;
      }

      // Load the script
      const script = document.createElement("script");
      script.src =
        "https://app.aadvanto.com/widgets-assets/website-widgets.bundle.js";
      script.async = true;

      script.onload = () => {
        console.log("Aadvanto script loaded");
        scriptLoaded = true;

        // Wait a bit for initialization then show widget regardless
        showWidget = true;
      };

      script.onerror = (error) => {
        console.error("Failed to load Aadvanto script:", error);
        showWidget = false;
      };

      document.head.appendChild(script);
    }
  });

  // Clean up the flag when navigating away (not on refresh)
  onMount(() => {
    return () => {
      // This runs when component unmounts (navigating away)
      if (browser) {
        sessionStorage.removeItem("social-page-refreshed");
      }
    };
  });
</script>

<svelte:head>
  <title>Social Media - Hotel Ludwig van Beethoven</title>
  <meta
    name="description"
    content="Stay connected with Hotel Ludwig van Beethoven through our social media updates."
  />
</svelte:head>

<div class="social-page">
  <div class="container">
    <header class="page-header">
      <h1>Social Media</h1>
      <p>
        Stay connected with us and see what our guests are sharing about their
        experiences.
      </p>
    </header>

    <section class="social-widget-section">
      <div class="widget-container">
        {#if !showWidget}
          <div class="loading">
            <div class="spinner"></div>
            <p>Loading social media feed...</p>
          </div>
        {/if}

        <!-- Always render the widget HTML, just hide it while loading -->
        <div class="widget-wrapper" style="display: {showWidget ? 'flex' : 'none'}">
          <ub-widget-social-post
            data-key="OlkquTEQk5PlrkXGrs3w8Fq7nXLwyv"
            data-locationId="4973010"
          >
          </ub-widget-social-post>
        </div>
      </div>
    </section>

    <!-- Keep the iframe approach hidden but present -->
    <section class="alternative-widget-section" style="display: none;">
      <div class="widget-container">
        <iframe
          src="https://app.aadvanto.com/widget/social-post?key=OlkquTEQk5PlrkXGrs3w8Fq7nXLwyv&locationId=4973010"
          width="100%"
          height="600"
          frameborder="0"
          style="border: none;"
        >
        </iframe>
      </div>
    </section>
  </div>
</div>

<style>
  .social-page {
    min-height: 100vh;
    background: var(--color-background);
    padding: var(--space-4xl) 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .page-header {
    text-align: center;
    margin-bottom: var(--space-4xl);
  }

  .page-header h1 {
    color: var(--color-text);
    margin-bottom: var(--space-lg);
    font-family: var(--font-display);
  }

  .page-header p {
    color: var(--color-text-light);
    font-size: var(--font-size-lg);
    max-width: 600px;
    margin: 0 auto;
  }

  .widget-container {
    background: var(--color-background-elevated);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-xl);
    padding: var(--space-2xl);
    min-height: 800px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 600px;
    text-align: center;
  }

  .spinner {
    width: 48px;
    height: 48px;
    border: 3px solid var(--color-border-light);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: var(--space-lg);
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .loading p {
    color: var(--color-text-light);
    font-size: var(--font-size-lg);
  }

  .widget-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  /* Widget styling - force center alignment */
  :global(ub-widget-social-post) {
    width: 100% !important;
    max-width: 100% !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  /* Target all nested elements in the widget */
  :global(ub-widget-social-post *) {
    margin-left: auto !important;
    margin-right: auto !important;
    text-align: center !important;
  }

  /* Target direct children */
  :global(ub-widget-social-post > *) {
    width: 100% !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  /* Target any divs inside the widget */
  :global(ub-widget-social-post div) {
    margin-left: auto !important;
    margin-right: auto !important;
  }

  /* Target any iframes inside the widget */
  :global(ub-widget-social-post iframe) {
    margin: 0 auto !important;
    display: block !important;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .social-page {
      padding: var(--space-2xl) 0;
    }

    .container {
      padding: 0 var(--space-md);
    }

    .widget-container {
      padding: var(--space-xl);
      min-height: 600px;
    }
  }
</style>

