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
        <picture>
          <source
            media="(max-width: 480px)"
            srcset="{imageData.image.url}?w=480&q=60&auto=compress,format&fm=webp"
            type="image/webp"
          />
          <source
            media="(max-width: 768px)"
            srcset="{imageData.image.url}?w=768&q=65&auto=compress,format&fm=webp"
            type="image/webp"
          />
          <source
            media="(max-width: 1200px)"
            srcset="{imageData.image.url}?w=1000&q=70&auto=compress,format&fm=webp"
            type="image/webp"
          />
          <img
            src="{imageData.image.url}?w=1200&q=75&auto=compress,format&fm=webp"
            alt={imageData.image.alt || ''}
            class="slice-image"
            loading="lazy"
            decoding="async"
            width={imageData.image.dimensions?.width}
            height={imageData.image.dimensions?.height}
          />
        </picture>
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