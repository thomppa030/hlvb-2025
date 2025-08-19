<!-- src/lib/slices/NotFound.svelte -->
<script>
  export let slice;
  
  // Log unknown slice type for debugging
  console.warn('Unknown slice type:', slice.slice_type, slice);
</script>

<section class="slice-not-found">
  <div class="container">
    <div class="warning-content">
      <h3>Unknown Content Block</h3>
      <p>Content type "{slice.slice_type}" is not yet implemented.</p>
      {#if slice.primary}
        <details>
          <summary>Debug Info (Development Only)</summary>
          <pre>{JSON.stringify(slice, null, 2)}</pre>
        </details>
      {/if}
    </div>
  </div>
</section>

<style>
  .slice-not-found {
    padding: var(--space-xl) 0;
    background: var(--color-background-alt);
    border: 2px dashed var(--color-border);
    margin: var(--space-lg) 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .warning-content {
    text-align: center;
    color: var(--color-text-light);
  }

  .warning-content h3 {
    font-family: var(--font-primary);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--space-sm);
    color: var(--color-warning);
  }

  .warning-content p {
    font-family: var(--font-primary);
    font-size: var(--font-size-sm);
    margin-bottom: var(--space-md);
  }

  details {
    margin-top: var(--space-md);
    text-align: left;
  }

  summary {
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    color: var(--color-text-light);
    margin-bottom: var(--space-sm);
  }

  pre {
    background: var(--color-background);
    padding: var(--space-md);
    border-radius: var(--radius-md);
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    overflow-x: auto;
    color: var(--color-text);
    border: 1px solid var(--color-border);
  }

  /* Hide in production */
  @media (prefers-reduced-motion: no-preference) {
    .slice-not-found {
      opacity: 0.8;
    }
  }
</style>