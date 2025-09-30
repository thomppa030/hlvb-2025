<!-- src/lib/components/ui/ImageCarousel.svelte -->
<script>
  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  // Props
  export let images = []; // Array of image objects: { src, alt, caption? }
  export let autoplay = false;
  export let autoplayInterval = 5000;
  export let showThumbnails = true;
  export let showIndicators = true;
  export let showNavigation = true;
  export let aspectRatio = '16/9'; // CSS aspect-ratio value

  // State
  let currentIndex = 0;
  let isAutoplayActive = autoplay;
  let autoplayTimer = null;
  let carouselContainer = null;
  let touchStartX = 0;
  let touchEndX = 0;

  // Reactive statements
  $: totalImages = images.length;
  $: hasImages = totalImages > 0;
  $: canNavigate = totalImages > 1;

  // Get preview images (left and right)
  $: leftPreview = totalImages > 1 ? images[currentIndex === 0 ? totalImages - 1 : currentIndex - 1] : null;
  $: rightPreview = totalImages > 1 ? images[currentIndex === totalImages - 1 ? 0 : currentIndex + 1] : null;

  // Navigation functions
  function goToSlide(index) {
    if (index < 0) {
      currentIndex = totalImages - 1;
    } else if (index >= totalImages) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    dispatch('slideChange', { index: currentIndex });
    resetAutoplay();
  }
  
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }
  
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }
  
  // Autoplay functions
  function startAutoplay() {
    if (!autoplay || totalImages <= 1) return;
    
    autoplayTimer = setInterval(() => {
      nextSlide();
    }, autoplayInterval);
    isAutoplayActive = true;
  }
  
  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
    isAutoplayActive = false;
  }
  
  function resetAutoplay() {
    if (autoplay) {
      stopAutoplay();
      startAutoplay();
    }
  }
  
  // Touch/swipe handlers
  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
  }
  
  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide(); // Swipe left - next image
      } else {
        prevSlide(); // Swipe right - previous image
      }
    }
  }
  
  // Keyboard navigation
  function handleKeydown(e) {
    if (!canNavigate) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        prevSlide();
        break;
      case 'ArrowRight':
        e.preventDefault();
        nextSlide();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(totalImages - 1);
        break;
    }
  }
  
  onMount(() => {
    if (autoplay && totalImages > 1) {
      startAutoplay();
    }
    
    return () => {
      stopAutoplay();
    };
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<div 
  class="carousel"
  class:carousel--single={!canNavigate}
  bind:this={carouselContainer}
  on:mouseenter={stopAutoplay}
  on:mouseleave={() => autoplay && startAutoplay()}
  role="region"
  aria-label="Image carousel"
>
  {#if hasImages}
    <!-- Main carousel display -->
    <div class="carousel__main">
      <!-- Left preview thumbnail -->
      {#if showThumbnails && leftPreview && canNavigate}
        <button 
          class="carousel__preview carousel__preview--left"
          on:click={prevSlide}
          aria-label="Previous image"
          title={leftPreview.alt}
        >
          <img 
            src={leftPreview.src} 
            alt={leftPreview.alt}
            loading="lazy"
          />
        </button>
      {/if}
      
      <!-- Main image container -->
      <div 
        class="carousel__container"
        style="aspect-ratio: {aspectRatio}"
        on:touchstart={handleTouchStart}
        on:touchend={handleTouchEnd}
      >
        <div class="carousel__slide">
          <img 
            src={images[currentIndex].src} 
            alt={images[currentIndex].alt}
            class="carousel__image"
            loading="lazy"
          />
          
          {#if images[currentIndex].caption}
            <div class="carousel__caption">
              {images[currentIndex].caption}
            </div>
          {/if}
        </div>
        
        <!-- Navigation arrows -->
        {#if showNavigation && canNavigate}
          <button 
            class="carousel__nav carousel__nav--prev"
            on:click={prevSlide}
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <button 
            class="carousel__nav carousel__nav--next"
            on:click={nextSlide}
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        {/if}
      </div>
      
      <!-- Right preview thumbnail -->
      {#if showThumbnails && rightPreview && canNavigate}
        <button 
          class="carousel__preview carousel__preview--right"
          on:click={nextSlide}
          aria-label="Next image"
          title={rightPreview.alt}
        >
          <img 
            src={rightPreview.src} 
            alt={rightPreview.alt}
            loading="lazy"
          />
        </button>
      {/if}
    </div>
    
    <!-- Indicators -->
    {#if showIndicators && canNavigate}
      <div class="carousel__indicators">
        {#each images as _, index}
          <button
            class="carousel__indicator"
            class:carousel__indicator--active={index === currentIndex}
            on:click={() => goToSlide(index)}
            aria-label="Go to slide {index + 1}"
            aria-current={index === currentIndex ? 'true' : 'false'}
          ></button>
        {/each}
      </div>
    {/if}
    
    <!-- Image counter -->
    <div class="carousel__counter">
      {currentIndex + 1} / {totalImages}
    </div>
  {:else}
    <div class="carousel__empty">
      <p>No images to display</p>
    </div>
  {/if}
</div>

<style>
  .carousel {
    position: relative;
    width: 100%;
    background: var(--color-background-elevated);
    border-radius: var(--radius-xl);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--color-border-light);
  }
  
  .carousel__main {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-lg);
  }
  
  .carousel__container {
    position: relative;
    flex: 1;
    overflow: hidden;
    border-radius: var(--radius-lg);
    background: var(--color-background);
  }
  
  .carousel__slide {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .carousel__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform var(--transition-normal);
  }
  
  .carousel__image:hover {
    transform: scale(1.02);
  }
  
  .carousel__caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    color: white;
    padding: var(--space-xl) var(--space-lg) var(--space-lg);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
  }
  
  .carousel__preview {
    flex-shrink: 0;
    width: 160px;
    height: 120px;
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    overflow: hidden;
    cursor: pointer;
    transition: all var(--transition-fast);
    background: var(--color-background);
    padding: 0;
  }
  
  .carousel__preview:hover {
    border-color: var(--color-secondary);
    transform: scale(1.05);
    box-shadow: var(--shadow-md);
  }
  
  .carousel__preview:focus {
    outline: none;
    border-color: var(--color-secondary);
    box-shadow: 0 0 0 3px rgba(26, 74, 107, 0.1);
  }
  
  .carousel__preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  .carousel__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-full);
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-fast);
    color: var(--color-text);
    backdrop-filter: blur(10px);
    z-index: 2;
  }
  
  .carousel__nav:hover {
    background: rgba(255, 255, 255, 1);
    border-color: var(--color-secondary);
    color: var(--color-secondary);
    transform: translateY(-50%) scale(1.1);
    box-shadow: var(--shadow-md);
  }
  
  .carousel__nav:focus {
    outline: none;
    border-color: var(--color-secondary);
    box-shadow: 0 0 0 3px rgba(26, 74, 107, 0.1);
  }
  
  .carousel__nav--prev {
    left: var(--space-md);
  }
  
  .carousel__nav--next {
    right: var(--space-md);
  }
  
  .carousel__indicators {
    display: flex;
    justify-content: center;
    gap: var(--space-sm);
    padding: var(--space-md) var(--space-lg);
    background: var(--color-background-alt);
  }
  
  .carousel__indicator {
    width: 12px;
    height: 12px;
    border-radius: var(--radius-full);
    background: var(--color-border);
    border: none;
    cursor: pointer;
    transition: all var(--transition-fast);
  }
  
  .carousel__indicator:hover {
    background: var(--color-text-light);
    transform: scale(1.2);
  }
  
  .carousel__indicator--active {
    background: var(--color-secondary);
    transform: scale(1.3);
  }
  
  .carousel__indicator:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(26, 74, 107, 0.1);
  }
  
  .carousel__counter {
    position: absolute;
    top: var(--space-lg);
    right: var(--space-lg);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: var(--space-xs) var(--space-md);
    border-radius: var(--radius-lg);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    backdrop-filter: blur(10px);
    z-index: 3;
    min-width: 60px;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }
  
  .carousel__empty {
    padding: var(--space-4xl);
    text-align: center;
    color: var(--color-text-light);
  }
  
  .carousel__empty p {
    margin: 0;
    font-size: var(--font-size-lg);
  }
  
  /* Hide previews on mobile */
  @media (max-width: 768px) {
    .carousel__preview {
      display: none;
    }
    
    .carousel__main {
      padding: var(--space-md);
      gap: 0;
    }
    
    .carousel__nav {
      width: 40px;
      height: 40px;
    }
    
    .carousel__nav--prev {
      left: var(--space-sm);
    }
    
    .carousel__nav--next {
      right: var(--space-sm);
    }
    
    .carousel__counter {
      top: var(--space-sm);
      right: var(--space-sm);
      font-size: var(--font-size-xs);
    }
  }
  
  /* Hide nav arrows when single image */
  .carousel--single .carousel__nav {
    display: none;
  }
  
  /* Improved touch interaction */
  .carousel__container {
    touch-action: pan-y;
  }
  
  /* Loading state */
  .carousel__image {
    background: var(--color-background-alt);
  }
  
  /* Focus styles for accessibility */
  .carousel:focus-within {
    box-shadow: var(--shadow-xl);
  }
</style>