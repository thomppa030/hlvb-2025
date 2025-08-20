<!-- src/routes/social/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  onMount(() => {
    if (browser) {
      // Load the Aadvanto widget script dynamically
      const script = document.createElement('script');
      script.src = 'https://app.aadvanto.com/widgets-assets/website-widgets.bundle.js';
      script.type = 'text/javascript';
      document.head.appendChild(script);
    }
  });
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
        <!-- Aadvanto Social Media Widget -->
        <ub-widget-social-post 
          data-key="OlkquTEQk5PlrkXGrs3w8Fq7nXLwyv" 
          data-locationId="4973010">
        </ub-widget-social-post>
      </div>
    </section>

    <section class="review-widget-section">
      <div class="widget-container">
        <!-- Aadvanto Review Widget -->
        <ub-widget-review 
          data-key="ef5R1NixainuYOX3bV7neuFNSfwJbW" 
          data-locationId="4973010">
        </ub-widget-review>
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