<!-- src/lib/slices/HeadingSlice.svelte -->
<script>
  import { PrismicRichText } from '@prismicio/svelte';
  
  export let slice;
  
  // Extract data with fallbacks
  $: headingData = {
    title: slice.primary.title || [{ type: 'heading1', text: 'Page Title', spans: [] }],
    subtitle: slice.primary.subtitle || null,
    alignment: slice.primary.alignment || 'center'
  };
</script>

<section class="heading-section">
  <div class="container">
    <div class="heading-content" class:text-center={headingData.alignment === 'center'} 
         class:text-left={headingData.alignment === 'left'}
         class:text-right={headingData.alignment === 'right'}>
      <div class="heading-title">
        <PrismicRichText field={headingData.title} />
      </div>
      
      {#if headingData.subtitle}
        <div class="heading-subtitle">
          <PrismicRichText field={headingData.subtitle} />
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .heading-section {
    background: var(--color-background);
    color: var(--color-text);
    padding: var(--space-4xl) 0 var(--space-3xl);
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }
  
  .heading-content {
    position: relative;
  }
  
  .text-center {
    text-align: center;
  }
  
  .text-left {
    text-align: left;
  }
  
  .text-right {
    text-align: right;
  }
  
  .heading-title :global(h1) {
    font-size: var(--font-size-4xl);
    font-family: var(--font-display);
    margin-bottom: var(--space-lg);
    color: var(--color-text);
    font-weight: var(--font-weight-semibold);
    letter-spacing: -0.01em;
    line-height: var(--line-height-tight);
  }
  
  .heading-subtitle :global(p) {
    font-size: var(--font-size-lg);
    margin-bottom: 0;
    color: var(--color-text);
    font-weight: var(--font-weight-normal);
    max-width: 600px;
    line-height: var(--line-height-normal);
  }
  
  .text-center .heading-subtitle :global(p) {
    margin-left: auto;
    margin-right: auto;
  }
  
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .heading-section {
      padding: var(--space-3xl) 0 var(--space-2xl);
    }
    
    .heading-title :global(h1) {
      font-size: var(--font-size-3xl);
    }
    
    .heading-subtitle :global(p) {
      font-size: var(--font-size-base);
    }
  }
  
  @media (max-width: 480px) {
    .heading-title :global(h1) {
      font-size: var(--font-size-2xl);
    }
    
    .heading-subtitle :global(p) {
      font-size: var(--font-size-sm);
    }
  }
</style>