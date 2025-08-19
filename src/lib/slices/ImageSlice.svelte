<!-- src/lib/slices/ImageSlice.svelte -->
<script>
  import { PrismicImage, PrismicRichText } from '@prismicio/svelte';
  
  export let slice;

  $: imageData = {
    image: slice.primary.image,
    caption: slice.primary.caption,
    layout: slice.primary.layout || 'full-width'
  };
</script>

<section class="image-slice" class:layout-contained={imageData.layout === 'contained'}>
  <div class="container">
    <div class="image-wrapper">
      {#if imageData.image?.url}
        <PrismicImage 
          field={imageData.image}
          class="slice-image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      {/if}
      
      {#if imageData.caption && imageData.caption.length > 0}
        <div class="image-caption">
          <PrismicRichText field={imageData.caption} />
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .image-slice {
    padding: var(--space-4xl) 0;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .layout-contained .container {
    max-width: 1200px;
  }

  .image-wrapper {
    position: relative;
  }

  .image-wrapper :global(.slice-image) {
    width: 100%;
    height: auto;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
  }

  .image-caption {
    margin-top: var(--space-lg);
    text-align: center;
  }

  .image-caption :global(p) {
    font-family: var(--font-primary);
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
    font-style: italic;
    margin: 0;
  }

  /* Dark mode adjustments */
  :global([data-theme="dark"]) .image-wrapper :global(.slice-image) {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .image-slice {
      padding: var(--space-3xl) 0;
    }

    .container {
      padding: 0 var(--space-md);
    }

    .image-wrapper :global(.slice-image) {
      border-radius: var(--radius-md);
    }
  }
</style>