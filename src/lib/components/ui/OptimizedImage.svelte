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
    if (!baseSrc.includes('.')) return null;
    
    const [name, ext] = baseSrc.split('.').slice(-2);
    const basePath = baseSrc.replace(`.${ext}`, '');
    
    const breakpoints = [400, 600, 800, 1200, 1600, 2000].filter(w => w <= maxWidth);
    if (!breakpoints.includes(maxWidth)) breakpoints.push(maxWidth);
    
    return breakpoints
      .map(w => `${basePath}-${w}w.webp ${w}w`)
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