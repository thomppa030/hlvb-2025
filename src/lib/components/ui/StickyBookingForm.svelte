<!-- src/lib/components/ui/StickyBookingForm.svelte -->
<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import BookingWidget from './BookingWidget.svelte';
  import Button from './Button.svelte';
  
  let isVisible = false;
  let isUserClosed = false;
  let heroElement = null;
  let observer = null;
  
  
  // Reset visibility when page changes (language switch)
  $: if ($page.url.pathname) {
    isVisible = false;
    isUserClosed = false;
    // Clear cached hero element on page change
    heroElement = null;
    if (browser) {
      // Setup observer for new page
      setupObserver();
    }
  }
  
  function setupObserver() {
    if (!browser) return;
    
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    
    // Cache hero element lookup - only query once per page
    if (!heroElement) {
      heroElement = document.querySelector('.hero');
    }
    
    if (!heroElement) {
      // If hero still not found, try once more with longer delay to avoid excessive DOM queries
      setTimeout(() => setupObserver(), 100);
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
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  });
  

  function handleClose() {
    isUserClosed = true;
    isVisible = false;
  }
</script>

<div 
  class="sticky-booking-form" 
  class:visible={isVisible}
>
  <div class="container">
    <div class="sticky-form-content">
      <BookingWidget type="form" hotelId="beethoven" />
    </div>
    <Button
      variant="ghost"
      size="small"
      on:click={handleClose}
      ariaLabel="Close booking form"
      class="close-button"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </Button>
  </div>
</div>

<style>
  .sticky-booking-form {
    position: fixed;
    /* Fixed positioning for HeaderCentered only */
    top: 110px; /* Desktop centered header */
    left: 0;
    right: 0;
    z-index: 90;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    transform: translateY(-100%);
    transition: transform var(--transition-normal);
    box-shadow: 0 4px 12px rgba(90, 78, 71, 0.08);
  }

  /* Responsive positioning for HeaderCentered */
  @media (max-width: 1024px) and (min-width: 769px) {
    .sticky-booking-form {
      top: 90px; /* Tablet centered header */
    }
  }

  @media (max-width: 768px) {
    .sticky-booking-form {
      top: 80px; /* Mobile centered header */
    }
  }
  
  .sticky-booking-form.visible {
    transform: translateY(0);
  }
  
  .container {
    max-width: 1380px; /* Match hero booking widget width */
    margin: 0 auto;
    padding: var(--space-md);
    position: relative;
  }

  .sticky-form-content {
    width: 100%;
  }

  :global(.close-button) {
    position: absolute !important;
    top: var(--space-md);
    right: var(--space-md);
    width: 32px;
    height: 32px;
    z-index: 10;
  }
  
  /* Compact form styling for sticky version */
  .sticky-booking-form :global(.booking-widget) {
    background: rgba(255, 255, 255, 0.95);
    border: none;
    box-shadow: none;
    padding: var(--space-md);
    width: 100%;
    border-radius: var(--radius-lg);
  }
  
  .sticky-booking-form :global(.booking-form) {
    gap: var(--space-sm);
  }
  
  .sticky-booking-form :global(.form-group input),
  .sticky-booking-form :global(.form-group select) {
    min-height: 36px;
    padding: var(--space-xs) var(--space-sm);
    font-size: var(--font-size-sm);
  }
  
  .sticky-booking-form :global(.form-group label) {
    font-size: var(--font-size-xs);
  }

  
  /* Mobile responsive */
  @media (max-width: 768px) {
    .container {
      padding: var(--space-sm);
    }

    :global(.close-button) {
      top: var(--space-sm);
      right: var(--space-sm);
      width: 28px;
      height: 28px;
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