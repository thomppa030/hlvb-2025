<!-- src/routes/social/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  let widgetsLoaded = false;
  let scriptLoaded = false;
  let loadingProgress = 0;
  let loadingStatus = 'Initializing...';

  onMount(() => {
    if (browser) {
      loadingProgress = 10;
      loadingStatus = 'Checking for existing widgets...';

      // Check if script is already loaded (e.g., from navigation)
      const existingScript = document.querySelector('script[src*="aadvanto.com"]');

      if (existingScript) {
        loadingProgress = 30;
        loadingStatus = 'Widget script found, initializing...';
        // Script exists, wait for widgets to be defined or reinitialize
        checkWidgetsReady();
      } else {
        loadingProgress = 20;
        loadingStatus = 'Loading widget script...';

        // Load the Aadvanto widget script dynamically
        const script = document.createElement('script');
        script.src = 'https://app.aadvanto.com/widgets-assets/website-widgets.bundle.js';
        script.type = 'text/javascript';
        script.async = true;

        script.onload = () => {
          scriptLoaded = true;
          loadingProgress = 50;
          loadingStatus = 'Script loaded, initializing widgets...';
          checkWidgetsReady();
        };

        script.onerror = () => {
          loadingProgress = 0;
          loadingStatus = 'Failed to load widget script';
          console.error('Failed to load Aadvanto widgets script');
        };

        document.head.appendChild(script);
      }
    }
  });

  function checkWidgetsReady() {
    let checkCount = 0;
    const maxChecks = 100; // 10 seconds total

    // Check if custom elements are defined
    const checkInterval = setInterval(() => {
      checkCount++;

      // Update progress based on time elapsed
      const progressIncrement = Math.min(90, 50 + (checkCount * 0.4));
      loadingProgress = progressIncrement;

      // Check for social post widget
      const hasSocialWidget = window.customElements &&
                             window.customElements.get('ub-widget-social-post');

      // Check for review widget
      const hasReviewWidget = window.customElements &&
                             window.customElements.get('ub-widget-review');

      if (hasSocialWidget && !hasReviewWidget) {
        loadingStatus = 'Loading review widget...';
        loadingProgress = 70;
      } else if (!hasSocialWidget && hasReviewWidget) {
        loadingStatus = 'Loading social widget...';
        loadingProgress = 70;
      } else if (hasSocialWidget && hasReviewWidget) {
        clearInterval(checkInterval);
        loadingProgress = 95;
        loadingStatus = 'Finalizing widgets...';

        // Force re-render of widgets if they exist in DOM
        const widgets = document.querySelectorAll('ub-widget-social-post, ub-widget-review');
        widgets.forEach(widget => {
          // Trigger widget initialization if needed
          if (widget.connectedCallback) {
            widget.connectedCallback();
          }
        });

        // Small delay before showing widgets
        setTimeout(() => {
          loadingProgress = 100;
          loadingStatus = 'Ready!';
          setTimeout(() => {
            widgetsLoaded = true;
          }, 300);
        }, 500);
      } else if (checkCount >= maxChecks) {
        clearInterval(checkInterval);
        loadingProgress = 0;
        loadingStatus = 'Widget loading timed out. Please refresh the page.';
      } else {
        loadingStatus = 'Waiting for widgets to initialize...';
      }
    }, 100);
  }
</script>

<svelte:head>
  <title>Social Media - Hotel Ludwig van Beethoven</title>
  <meta name="description" content="Stay connected with Hotel Ludwig van Beethoven through our social media updates and guest experiences." />
</svelte:head>

<div class="social-page">
  <div class="container">
    <header class="page-header">
      <h1>Social Media</h1>
      <p>Stay connected with us and see what our guests are sharing about their experiences at Hotel Ludwig van Beethoven.</p>
    </header>

    <section class="social-widget-section">
      <div class="widget-container">
        {#if widgetsLoaded}
          <!-- Aadvanto Social Media Widget -->
          <ub-widget-social-post
            data-key="OlkquTEQk5PlrkXGrs3w8Fq7nXLwyv"
            data-locationId="4973010">
          </ub-widget-social-post>
        {:else}
          <div class="loading-placeholder">
            <div class="loading-content">
              <div class="spinner"></div>
              <p class="loading-status">{loadingStatus}</p>
              <div class="progress-bar">
                <div class="progress-fill" style="width: {loadingProgress}%"></div>
              </div>
              <p class="loading-percentage">{loadingProgress}%</p>
            </div>
          </div>
        {/if}
      </div>
    </section>

    <section class="review-widget-section">
      <div class="widget-container">
        {#if widgetsLoaded}
          <!-- Aadvanto Review Widget -->
          <ub-widget-review
            data-key="ef5R1NixainuYOX3bV7neuFNSfwJbW"
            data-locationId="4973010">
          </ub-widget-review>
        {:else}
          <div class="loading-placeholder">
            <div class="loading-content">
              <div class="spinner"></div>
              <p class="loading-status">{loadingStatus}</p>
              <div class="progress-bar">
                <div class="progress-fill" style="width: {loadingProgress}%"></div>
              </div>
              <p class="loading-percentage">{loadingProgress}%</p>
            </div>
          </div>
        {/if}
      </div>
    </section>
  </div>
</div>

<style>
  .social-page {
    min-height: 100vh;
    background: var(--color-background);
    padding-top: var(--space-4xl);
    padding-bottom: var(--space-4xl);
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
    line-height: var(--line-height-relaxed);
    max-width: 600px;
    margin: 0 auto;
  }

  .social-widget-section {
    margin-bottom: var(--space-4xl);
  }

  .review-widget-section {
    margin-bottom: var(--space-4xl);
  }

  .widget-container {
    background: var(--color-background-elevated);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-xl);
    padding: var(--space-2xl);
    box-shadow: 0 4px 12px rgba(90, 78, 71, 0.08);
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Loading state */
  .loading-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: inherit;
    padding: var(--space-3xl) 0;
  }

  .loading-content {
    text-align: center;
    max-width: 300px;
  }

  .spinner {
    width: 60px;
    height: 60px;
    margin: 0 auto var(--space-xl);
    border: 3px solid var(--color-border-light);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .loading-status {
    color: var(--color-text);
    font-size: var(--font-size-lg);
    margin-bottom: var(--space-lg);
    min-height: 1.5em;
  }

  .progress-bar {
    width: 100%;
    height: 8px;
    background: var(--color-border-light);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: var(--space-md);
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .loading-percentage {
    color: var(--color-text-light);
    font-size: var(--font-size-sm);
    font-family: var(--font-mono);
  }

  /* Aadvanto widgets will be inserted here */
  :global(ub-widget-social-post),
  :global(ub-widget-review) {
    width: 100%;
    max-width: 100%;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .social-page {
      padding-top: var(--space-2xl);
    }
    
    .container {
      padding: 0 var(--space-md);
    }

    .widget-container {
      padding: var(--space-xl);
      min-height: 300px;
    }

  }

  @media (max-width: 480px) {
    .container {
      padding: 0 var(--space-sm);
    }

    .widget-container {
      padding: var(--space-lg);
    }
  }
</style>