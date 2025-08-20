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
  
  // Generate responsive srcset only if we have actual multiple image sizes
  // For now, disable srcset to ensure proper LCP measurement
  $: responsiveSrcset = null;
  
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