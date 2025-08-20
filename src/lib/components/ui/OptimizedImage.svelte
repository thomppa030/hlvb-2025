<!-- src/lib/components/ui/OptimizedImage.svelte -->
<script>
  import { browser } from '$app/environment';
  
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
  export let mobileSrc = null; // Optional mobile-optimized image
  
  // Detect if we're on mobile (client-side only)
  let isMobile = false;
  if (browser && mobileSrc) {
    isMobile = window.matchMedia('(max-width: 768px)').matches;
  }
  
  // Use mobile src as default on mobile devices
  $: actualSrc = (isMobile && mobileSrc) ? mobileSrc : src;
  
  // Generate responsive srcset for mobile/desktop if mobileSrc is provided
  $: responsiveSrcset = mobileSrc ? `${mobileSrc} 800w, ${src} 1920w` : null;
  $: responsiveSizes = mobileSrc ? '(max-width: 768px) 800px, 1920px' : sizes;
  
  // Handle image load error - fallback to original
  function handleError(event) {
    if (event.target.src.includes('.webp')) {
      // Fallback to original format
      event.target.src = src.replace('-\\d+w\\.webp', '').replace('.webp', '.jpg');
    }
  }
</script>

<img
  src={actualSrc}
  srcset={responsiveSrcset || undefined}
  {alt}
  {width}
  {height}
  sizes={responsiveSizes}
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