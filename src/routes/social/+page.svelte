<!-- src/routes/social/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  let isLoading = true;
  let hasError = false;

  onMount(() => {
    if (browser) {
      // Simple approach: Load script and wait a bit for initialization
      const script = document.createElement('script');
      script.src = 'https://app.aadvanto.com/widgets-assets/website-widgets.bundle.js';
      script.async = true;

      script.onload = () => {
        // Give the script time to initialize custom elements
        setTimeout(() => {
          isLoading = false;
        }, 1000);
      };

      script.onerror = () => {
        hasError = true;
        isLoading = false;
      };

      document.head.appendChild(script);

      // Fallback timeout
      setTimeout(() => {
        isLoading = false;
      }, 5000);
    }
  });
</script>

<svelte:head>
  <title>Social Media - Hotel Ludwig van Beethoven</title>
  <meta name="description" content="Stay connected with Hotel Ludwig van Beethoven through our social media updates." />
</svelte:head>

<div class="social-page">
  <div class="container">
    <header class="page-header">
      <h1>Social Media</h1>
      <p>Stay connected with us and see what our guests are sharing about their experiences.</p>
    </header>

    <section class="social-widget-section">
      <div class="widget-container">
        {#if hasError}
          <div class="error-message">
            <p>Unable to load social media content. Please try refreshing the page.</p>
          </div>
        {:else if isLoading}
          <div class="loading">
            <div class="spinner"></div>
            <p>Loading social media...</p>
          </div>
        {/if}

        <!-- Always render the widget, just hide it while loading -->
        <div class:hidden={isLoading || hasError}>
          <ub-widget-social-post
            data-key="OlkquTEQk5PlrkXGrs3w8Fq7nXLwyv"
            data-locationId="4973010">
          </ub-widget-social-post>
        </div>
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
  }

  .loading, .error-message {
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
    to { transform: rotate(360deg); }
  }

  .loading p, .error-message p {
    color: var(--color-text-light);
    font-size: var(--font-size-lg);
  }

  .error-message p {
    color: var(--color-error, var(--color-text-light));
  }

  .hidden {
    display: none;
  }

  /* Widget styling */
  :global(ub-widget-social-post) {
    width: 100%;
    max-width: 100%;
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