<!-- src/lib/slices/FeatureSlice.svelte -->
<script>
  import { PrismicRichText, PrismicImage } from '@prismicio/svelte';
  
  export let slice;
  
  // Determine if image is on left or right based on variation
  $: isImageLeft = slice.variation === 'imageLeft';
  
  // Extract data with fallbacks
  $: featureData = {
    heading: slice.primary.heading || [{ type: 'heading2', text: 'Feature Heading', spans: [] }],
    subheading: slice.primary.subheading || [{ type: 'heading3', text: 'Feature Subheading', spans: [] }],
    content: slice.primary.content || [{ type: 'paragraph', text: 'Feature content goes here', spans: [] }],
    image: slice.primary.image,
    imageAlt: slice.primary.image_alt || 'Feature image'
  };
</script>

<section class="feature-section">
  <div class="container">
    <div class="feature-grid" class:image-left={isImageLeft} class:image-right={!isImageLeft}>
      <!-- Image Column -->
      <div class="feature-image-wrapper">
        {#if featureData.image?.url}
          <picture>
            <source
              media="(max-width: 480px)"
              srcset="{featureData.image.url}?w=375&h=250&fit=crop&q=45&auto=compress,format&fm=webp"
              type="image/webp"
            />
            <source
              media="(max-width: 768px)"
              srcset="{featureData.image.url}?w=768&h=500&fit=crop&q=50&auto=compress,format&fm=webp"
              type="image/webp"
            />
            <img
              src="{featureData.image.url}?w=900&h=600&fit=crop&q=55&auto=compress,format&fm=webp"
              alt={featureData.imageAlt}
              class="feature-image"
              loading="lazy"
              decoding="async"
              width={featureData.image.dimensions?.width}
              height={featureData.image.dimensions?.height}
            />
          </picture>
        {:else}
          <div class="feature-image-placeholder"></div>
        {/if}
      </div>
      
      <!-- Content Column -->
      <div class="feature-content">
        <div class="feature-heading">
          <PrismicRichText field={featureData.heading} />
        </div>
        
        <div class="feature-subheading">
          <PrismicRichText field={featureData.subheading} />
        </div>
        
        <div class="feature-divider"></div>
        
        <div class="feature-text">
          <PrismicRichText field={featureData.content} />
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .feature-section {
    padding: var(--space-4xl) 0;
    background: var(--color-background);
    position: relative;
    overflow: hidden;
  }
  
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }
  
  .feature-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4xl);
    align-items: stretch;
  }
  
  /* Image positioning based on variation */
  .feature-grid.image-left {
    direction: ltr;
  }
  
  .feature-grid.image-right {
    direction: rtl;
  }
  
  .feature-grid.image-right .feature-content {
    direction: ltr;
  }
  
  /* Image Wrapper - Full height */
  .feature-image-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 500px;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  }
  
  .feature-image-wrapper :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  
  .feature-image-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    opacity: 0.1;
  }
  
  /* Content Column */
  .feature-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: var(--space-2xl) 0;
  }
  
  .feature-heading :global(h2) {
    font-family: var(--font-display);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: var(--space-md);
    letter-spacing: -0.01em;
    line-height: var(--line-height-tight);
  }
  
  .feature-subheading :global(h3) {
    font-family: var(--font-primary);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-medium);
    color: var(--color-secondary);
    margin-bottom: var(--space-lg);
    letter-spacing: 0.02em;
    text-transform: none;
  }
  
  /* Decorative line under subheading */
  .feature-divider {
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    margin-bottom: var(--space-xl);
    border-radius: var(--radius-full);
  }
  
  .feature-text :global(p) {
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    margin-bottom: var(--space-md);
  }
  
  .feature-text :global(ul),
  .feature-text :global(ol) {
    margin-left: var(--space-lg);
    margin-bottom: var(--space-md);
  }
  
  .feature-text :global(li) {
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    margin-bottom: var(--space-xs);
  }
  
  .feature-text :global(a) {
    color: var(--color-secondary);
    text-decoration: underline;
    transition: color var(--transition-fast);
  }
  
  .feature-text :global(a:hover) {
    color: var(--color-primary);
  }
  
  
  /* Responsive Design */
  @media (max-width: 1024px) {
    .feature-grid {
      gap: var(--space-3xl);
    }
    
    .feature-content {
      padding: var(--space-xl) 0;
    }
  }
  
  @media (max-width: 768px) {
    .feature-grid {
      grid-template-columns: 1fr;
      gap: var(--space-2xl);
    }
    
    /* Reset direction for mobile */
    .feature-grid.image-right {
      direction: ltr;
    }
    
    .feature-image-wrapper {
      min-height: 300px;
      max-height: 400px;
    }
    
    .feature-content {
      padding: 0;
    }
    
    .feature-heading :global(h2) {
      font-size: var(--font-size-2xl);
    }
    
    .feature-subheading :global(h3) {
      font-size: var(--font-size-lg);
    }
    
    .feature-divider {
      width: 60px;
      height: 2px;
    }
  }
  
  @media (max-width: 480px) {
    .feature-section {
      padding: var(--space-3xl) 0;
    }
    
    .feature-image-wrapper {
      min-height: 250px;
    }
    
    .feature-heading :global(h2) {
      font-size: var(--font-size-xl);
    }
    
    .feature-subheading :global(h3) {
      font-size: var(--font-size-base);
    }
  }
</style>