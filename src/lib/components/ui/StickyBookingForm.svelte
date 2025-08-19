<!-- src/lib/components/ui/StickyBookingForm.svelte -->
<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import BookingWidget from './BookingWidget.svelte';
  
  let isVisible = false;
  let isUserClosed = false;
  let heroElement = null;
  let stickyForm = null;
  let observer = null;
  
  // Reset visibility when page changes (language switch)
  $: if ($page.url.pathname) {
    isVisible = false;
    isUserClosed = false;
  }
  
  function setupObserver() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    
    // Find the hero section
    heroElement = document.querySelector('.hero');
    
    if (!heroElement) return;
    
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
  
  // Reset observer when page changes
  $: if ($page.url.pathname) {
    setTimeout(() => {
      setupObserver();
    }, 100); // Small delay to ensure DOM is updated
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
    top: 100px; /* Updated header height */
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
  
  .sticky-booking-form.visible {
    transform: translateY(0);
  }
  
  .container {
    max-width: 1200px;
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

  /* Ensure button text is white in dark mode for sticky form */
  :global([data-theme="dark"]) .sticky-booking-form :global(.booking-submit) {
    color: white !important;
  }
  
  /* Dark mode adjustments */
  :global([data-theme="dark"]) .sticky-booking-form {
    background: rgba(42, 37, 31, 0.95);
    border-bottom-color: rgba(255, 255, 255, 0.06);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  :global([data-theme="dark"]) .sticky-booking-form :global(.booking-widget) {
    background: rgba(42, 37, 31, 0.95);
  }

  :global([data-theme="dark"]) .close-button {
    border-color: var(--color-border);
    color: var(--color-text-light);
  }

  :global([data-theme="dark"]) .close-button:hover {
    background-color: var(--color-background);
    border-color: var(--color-border);
    color: var(--color-text);
  }

  :global([data-theme="dark"]) .close-button:focus {
    border-color: var(--color-secondary);
    box-shadow: 0 0 0 3px rgba(90, 138, 174, 0.15);
  }
  
  /* Mobile responsive */
  @media (max-width: 768px) {
    .sticky-booking-form {
      top: 80px; /* Mobile header height */
    }
    
    .container {
      padding: var(--space-md);
    }

    .close-button {
      top: var(--space-md);
      right: var(--space-md);
      width: 32px;
      height: 32px;
    }
    
    .sticky-booking-form :global(.form-row) {
      grid-template-columns: 1fr 1fr;
      gap: var(--space-sm);
    }
  }
  
  @media (max-width: 480px) {
    .sticky-booking-form :global(.form-row) {
      grid-template-columns: 1fr;
    }
  }
</style>