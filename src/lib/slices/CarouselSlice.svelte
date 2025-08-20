<!-- src/lib/slices/CarouselSlice.svelte -->
<script>
  import { PrismicRichText, PrismicImage } from '@prismicio/svelte';
  import ImageCarousel from '$lib/components/ui/ImageCarousel.svelte';
  
  export let slice;
  
  // Extract carousel configuration from slice primary fields
  $: carouselConfig = {
    autoplay: slice.primary.autoplay ?? false,
    autoplayInterval: slice.primary.autoplay_interval || 5000,
    showThumbnails: slice.primary.show_thumbnails ?? true,
    showIndicators: slice.primary.show_indicators ?? true,
    showNavigation: slice.primary.show_navigation ?? true,
    aspectRatio: slice.primary.aspect_ratio || '16/9'
  };
  
  // Convert Prismic image items to carousel format
  $: carouselImages = slice.items?.map(item => ({
    src: item.image?.url || '',
    alt: item.image?.alt || item.caption?.[0]?.text || 'Carousel image',
    caption: item.caption?.[0]?.text || ''
  })).filter(img => img.src) || [];
  
  // Section content
  $: sectionData = {
    heading: slice.primary.section_heading,
    subheading: slice.primary.section_subheading,
    description: slice.primary.section_description
  };
  
  // Check if we have any content to show
  $: hasContent = carouselImages.length > 0;
  $: hasHeading = sectionData.heading?.[0]?.text;
  $: hasSubheading = sectionData.subheading?.[0]?.text;
  $: hasDescription = sectionData.description?.[0]?.text;
</script>

{#if hasContent}
  <section class="carousel-slice">
    <div class="container">
      {#if hasHeading || hasSubheading || hasDescription}
        <div class="carousel-header">
          {#if hasHeading}
            <div class="carousel-heading">
              <PrismicRichText field={sectionData.heading} />
            </div>
          {/if}
          
          {#if hasSubheading}
            <div class="carousel-subheading">
              <PrismicRichText field={sectionData.subheading} />
            </div>
          {/if}
          
          {#if hasDescription}
            <div class="carousel-description">
              <PrismicRichText field={sectionData.description} />
            </div>
          {/if}
          
          <div class="carousel-divider"></div>
        </div>
      {/if}
      
      <div class="carousel-wrapper">
        <ImageCarousel 
          images={carouselImages}
          autoplay={carouselConfig.autoplay}
          autoplayInterval={carouselConfig.autoplayInterval}
          showThumbnails={carouselConfig.showThumbnails}
          showIndicators={carouselConfig.showIndicators}
          showNavigation={carouselConfig.showNavigation}
          aspectRatio={carouselConfig.aspectRatio}
        />
      </div>
    </div>
  </section>
{/if}

<style>
  .carousel-slice {
    padding: var(--space-4xl) 0;
    background: var(--color-background);
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .carousel-header {
    text-align: center;
    margin-bottom: var(--space-3xl);
  }

  .carousel-heading :global(h2) {
    font-family: var(--font-display);
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-lg);
    letter-spacing: -0.02em;
    line-height: var(--line-height-tight);
  }

  .carousel-subheading :global(h3) {
    font-family: var(--font-primary);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-medium);
    color: var(--color-secondary);
    margin-bottom: var(--space-lg);
    letter-spacing: 0.01em;
  }

  .carousel-description :global(p) {
    font-family: var(--font-primary);
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
    color: var(--color-text-light);
    max-width: 600px;
    margin: 0 auto var(--space-xl);
  }

  /* Decorative divider */
  .carousel-divider {
    width: 120px;
    height: 3px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    margin: 0 auto;
    border-radius: var(--radius-full);
  }

  .carousel-wrapper {
    position: relative;
  }

  /* Enhanced carousel styling for slice context */
  .carousel-wrapper :global(.carousel) {
    max-width: 100%;
    margin: 0 auto;
  }

  /* Responsive design */
  @media (max-width: 1024px) {
    .carousel-slice {
      padding: var(--space-3xl) 0;
    }

    .carousel-header {
      margin-bottom: var(--space-2xl);
    }

    .carousel-heading :global(h2) {
      font-size: var(--font-size-3xl);
    }

    .carousel-subheading :global(h3) {
      font-size: var(--font-size-lg);
    }

    .carousel-description :global(p) {
      font-size: var(--font-size-base);
    }

    .carousel-divider {
      width: 100px;
      height: 2px;
    }
  }

  @media (max-width: 768px) {
    .carousel-slice {
      padding: var(--space-2xl) 0;
    }

    .container {
      padding: 0 var(--space-md);
    }

    .carousel-header {
      margin-bottom: var(--space-xl);
    }

    .carousel-heading :global(h2) {
      font-size: var(--font-size-2xl);
      margin-bottom: var(--space-md);
    }

    .carousel-subheading :global(h3) {
      font-size: var(--font-size-base);
      margin-bottom: var(--space-md);
    }

    .carousel-description :global(p) {
      font-size: var(--font-size-sm);
      margin-bottom: var(--space-lg);
    }

    .carousel-divider {
      width: 80px;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 var(--space-sm);
    }

    .carousel-heading :global(h2) {
      font-size: var(--font-size-xl);
    }

    .carousel-divider {
      width: 60px;
    }
  }
</style>