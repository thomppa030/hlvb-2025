<!-- src/lib/components/ui/OptimizedImage.svelte -->
<script>
  export let src = '';
  export let alt = '';
  export let width = null;
  export let height = null;
  export let sizes = '100vw';
  export let loading = 'lazy';
  export let decoding = 'async';
  export let fetchpriority = 'auto'; // 'high', 'low', 'auto'
  export let class_ = '';
  export let style = '';
  export let placeholder = null; // Base64 or color
  
  // Generate responsive srcset if width is provided
  $: responsiveSrcset = width ? generateSrcset(src, width) : null;
  
  // Generate different sizes for responsive images
  function generateSrcset(baseSrc, maxWidth) {
    if (!baseSrc || !baseSrc.includes('.')) return null;
    
    // For now, let's create a simpler srcset since we don't have multiple image sizes
    // This could be enhanced later with actual responsive image generation
    const breakpoints = [400, 800, 1200, 1600].filter(w => w <= maxWidth);
    
    // Use the same source but with different size hints
    // In a real implementation, you'd have actual different sized images
    return breakpoints
      .map(w => `${baseSrc} ${w}w`)
      .join(', ');
  }
  
  // Handle image load error - fallback to original
  function handleError(event) {
    if (event.target.src.includes('.webp')) {
      // Fallback to original format
      event.target.src = src.replace('-\\d+w\\.webp', '').replace('.webp', '.jpg');
    }
  }
</script>

<img
  {src}
  srcset={responsiveSrcset || undefined}
  {alt}
  {width}
  {height}
  {sizes}
  {loading}
  {decoding}
  {fetchpriority}
  class={class_}
  {style}
  on:error={handleError}
  on:load
  {...$$restProps}
/>

<!-- Optional placeholder for loading state -->
{#if placeholder}
  <div 
    class="image-placeholder"
    style="background: {placeholder}; aspect-ratio: {width}/{height};"
    aria-hidden="true"
  ></div>
{/if}

<style>
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
  
  .image-placeholder {
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
  }
</style>