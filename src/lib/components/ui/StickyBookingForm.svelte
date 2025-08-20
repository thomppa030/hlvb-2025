<!-- src/lib/components/ui/StickyBookingForm.svelte -->
<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import BookingWidget from './BookingWidget.svelte';
  
  let isVisible = false;
  let isUserClosed = false;
  let heroElement = null;
  let stickyForm = null;
  let observer = null;
  let headerStyle = 'default';
  
  // Get header style from localStorage to match layout
  function getHeaderStyle() {
    if (!browser) return 'default';
    return localStorage.getItem('headerStyle') || 'default';
  }
  
  // Calculate dynamic top position based on header style
  function getTopPosition() {
    const style = getHeaderStyle();
    const width = window.innerWidth;
    
    if (width <= 768) {
      return '80px'; // Mobile header height is same for both styles
    } else if (width <= 1024 && style === 'centered') {
      return '90px'; // Tablet centered header height
    } else if (width <= 1024 && style === 'default') {
      return '100px'; // Tablet default header height (no change)
    }
    
    return style === 'centered' ? '110px' : '100px'; // Desktop heights
  }
  
  // Reset visibility when page changes (language switch)
  $: if ($page.url.pathname) {
    isVisible = false;
    isUserClosed = false;
    if (browser) {
      // Immediately setup observer for new page without delay
      setupObserver();
    }
  }
  
  function setupObserver() {
    if (!browser) return;
    
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    
    // Find the hero section
    heroElement = document.querySelector('.hero');
    
    if (!heroElement) {
      // If hero not found yet, try again on next tick
      requestAnimationFrame(() => setupObserver());
      return;
    }
    
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Show sticky form when hero is no longer visible and user hasn't closed it
          isVisible = !entry.isIntersecting && !isUserClosed;
        });
      },
      {
        threshold: 0,
        rootMargin: '-100px 0px 0px 0px' // Account for header height
      }
    );
    
    observer.observe(heroElement);
  }
  
  onMount(() => {
    setupObserver();
    updateHeaderStyle();
    
    // Listen for localStorage changes (when header style is toggled)
    const handleStorageChange = () => {
      updateHeaderStyle();
    };
    
    // Listen for window resize to recalculate position
    const handleResize = () => {
      updateHeaderStyle();
    };
    
    // Periodically check for header style changes (in case localStorage changes in same tab)
    const checkHeaderStyle = () => {
      const currentStyle = getHeaderStyle();
      if (currentStyle !== headerStyle) {
        updateHeaderStyle();
      }
    };
    
    const styleCheckInterval = setInterval(checkHeaderStyle, 500);
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
      clearInterval(styleCheckInterval);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('resize', handleResize);
    };
  });
  
  function updateHeaderStyle() {
    if (!browser || !stickyForm) return;
    headerStyle = getHeaderStyle();
    stickyForm.style.top = getTopPosition();
  }

  function handleClose() {
    isUserClosed = true;
    isVisible = false;
  }
</script>

<div 
  class="sticky-booking-form" 
  class:visible={isVisible}
  bind:this={stickyForm}
>
  <div class="container">
    <div class="sticky-form-content">
      <BookingWidget type="form" hotelId="beethoven" />
    </div>
    <button 
      class="close-button"
      on:click={handleClose}
      aria-label="Close booking form"
      title="Close booking form"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</div>

<style>
  .sticky-booking-form {
    position: fixed;
    top: 100px; /* Default fallback - will be updated by JavaScript */
    left: 0;
    right: 0;
    z-index: 90;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    transform: translateY(-100%);
    transition: transform var(--transition-normal), top var(--transition-fast);
    box-shadow: 0 4px 12px rgba(90, 78, 71, 0.08);
  }
  
  .sticky-booking-form.visible {
    transform: translateY(0);
  }
  
  .container {
    max-width: 1380px; /* Match hero booking widget width */
    margin: 0 auto;
    padding: var(--space-lg);
    position: relative;
  }

  .sticky-form-content {
    width: 100%;
  }

  .close-button {
    position: absolute;
    top: var(--space-lg);
    right: var(--space-lg);
    background: none;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-sm);
    cursor: pointer;
    color: var(--color-text-light);
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    z-index: 10;
  }

  .close-button:hover {
    background-color: var(--color-background-alt);
    border-color: var(--color-border);
    color: var(--color-text);
  }

  .close-button:focus {
    outline: none;
    border-color: var(--color-secondary);
    box-shadow: 0 0 0 3px rgba(26, 74, 107, 0.1);
  }
  
  /* Compact form styling for sticky version */
  .sticky-booking-form :global(.booking-widget) {
    background: rgba(255, 255, 255, 0.95);
    border: none;
    box-shadow: none;
    padding: var(--space-lg);
    width: 100%;
    border-radius: var(--radius-lg);
  }
  
  .sticky-booking-form :global(.booking-form) {
    gap: var(--space-md);
  }
  
  .sticky-booking-form :global(.form-group input),
  .sticky-booking-form :global(.form-group select) {
    min-height: 40px;
    padding: var(--space-sm) var(--space-md);
    font-size: var(--font-size-sm);
  }
  
  .sticky-booking-form :global(.form-group label) {
    font-size: var(--font-size-xs);
  }

  
  /* Mobile responsive */
  @media (max-width: 768px) {
    /* Top position is now handled dynamically by JavaScript */
    
    .container {
      padding: var(--space-md);
    }

    .close-button {
      top: var(--space-md);
      right: var(--space-md);
      width: 32px;
      height: 32px;
    }
    
    .sticky-booking-form :global(.form-row),
    .sticky-booking-form :global(.single-line) {
      grid-template-columns: 1fr 1fr;
      gap: var(--space-sm);
    }
  }
  
  @media (max-width: 480px) {
    .sticky-booking-form :global(.form-row),
    .sticky-booking-form :global(.single-line) {
      grid-template-columns: 1fr;
    }
  }
</style>