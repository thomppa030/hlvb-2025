<!-- src/lib/slices/MapSlice.svelte -->
<script>
  import GoogleMap from '$lib/components/ui/GoogleMap.svelte';

  export let slice;
</script>

<section class="map-slice">
  <div class="container">
    {#if slice.primary.heading}
      <h2 class="heading-accent">{slice.primary.heading}</h2>
    {/if}

    {#if slice.primary.map_embed_url}
      <GoogleMap
        embedUrl={slice.primary.map_embed_url}
        title={slice.primary.map_title || 'Location'}
        height={slice.primary.map_height || '400'}
      />
    {/if}
  </div>
</section>

<style>
  .map-slice {
    margin-bottom: var(--space-4xl);
    padding-bottom: var(--space-4xl);
    border-bottom: 1px solid var(--color-border-light);
  }

  .map-slice:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .container {
    max-width: var(--container-xl);
    margin: 0 auto;
  }

  h2.heading-accent {
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: var(--space-xl);
    letter-spacing: -0.01em;
  }

  @media (max-width: 768px) {
    .map-slice {
      margin-bottom: var(--space-3xl);
      padding-bottom: var(--space-3xl);
    }

    h2.heading-accent {
      font-size: var(--font-size-xl);
    }
  }
</style>
