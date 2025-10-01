<!-- src/lib/slices/InfoSectionSlice.svelte -->
<script>
  import { PrismicRichText } from '@prismicio/svelte';
  import GoogleMap from '$lib/components/ui/GoogleMap.svelte';

  export let slice;

  $: hasMap = slice.primary.show_map && slice.primary.map_embed_url;
</script>

<section class="info-section-slice">
  <div class="container">
    <div class="content-grid" class:has-map={hasMap}>
      <div class="text-section">
        {#if slice.primary.heading}
          <h1 class="heading-accent-center">{slice.primary.heading}</h1>
        {/if}

        {#if slice.primary.content}
          <div class="rich-text-content">
            <PrismicRichText field={slice.primary.content} />
          </div>
        {/if}
      </div>

      {#if hasMap}
        <div class="map-section">
          <GoogleMap
            embedUrl={slice.primary.map_embed_url}
            title={slice.primary.map_title || 'Location'}
            height={slice.primary.map_height || '600'}
          />
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .info-section-slice {
    background-color: var(--color-background);
    padding: var(--space-4xl) 0;
  }

  .container {
    max-width: var(--container-xl);
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .content-grid {
    display: grid;
    gap: var(--space-4xl);
  }

  .content-grid.has-map {
    grid-template-columns: 1fr 1.5fr;
    align-items: start;
  }

  .text-section h1 {
    font-family: var(--font-display);
    font-size: var(--font-size-4xl);
    margin-bottom: var(--space-xl);
    color: var(--color-text);
  }

  .rich-text-content :global(p) {
    font-family: var(--font-primary);
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    margin-bottom: var(--space-lg);
  }

  .rich-text-content :global(h2) {
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: var(--space-md);
    margin-top: var(--space-xl);
  }

  .rich-text-content :global(h3) {
    font-family: var(--font-display);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
    margin-bottom: var(--space-md);
    margin-top: var(--space-lg);
  }

  .rich-text-content :global(strong) {
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
  }

  .rich-text-content :global(a) {
    color: var(--color-secondary);
    text-decoration: none;
    font-weight: var(--font-weight-medium);
    transition: color var(--transition-fast);
  }

  .rich-text-content :global(a:hover) {
    color: var(--color-secondary-light);
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .info-section-slice {
      padding: var(--space-2xl) 0;
    }

    .content-grid.has-map {
      grid-template-columns: 1fr;
      gap: var(--space-2xl);
    }

    .text-section h1 {
      font-size: var(--font-size-3xl);
    }

    .container {
      padding: 0 var(--space-md);
    }
  }
</style>
