<!-- src/lib/components/ui/StickyBookingForm.svelte -->
<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import BookingWidget from './BookingWidget.svelte';
  import Button from './Button.svelte';
  import { t } from '$lib/stores/i18n.js';

  let isVisible = false;
  let isUserClosed = false;
  let heroElement = null;
  let observer = null;
  let isMobileModalOpen = false;
  let isMobile = false;
  
  
  // Reset visibility when page changes (language switch)
  $: if ($page.url.pathname) {
    isVisible = false;
    isUserClosed = false;
    isMobileModalOpen = false;
    // Clear cached hero element on page change
    heroElement = null;
    if (browser) {
      // Setup observer for new page
      setupObserver();
    }
  }

  // Check if mobile on mount and resize
  function checkMobile() {
    if (browser) {
      isMobile = window.innerWidth <= 768;
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
    checkMobile();
    setupObserver();

    const handleResize = () => {
      checkMobile();
      // Close mobile modal if resized to desktop
      if (!isMobile && isMobileModalOpen) {
        isMobileModalOpen = false;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener('resize', handleResize);
    };
  });
  

  function handleClose() {
    isUserClosed = true;
    isVisible = false;
  }

  function toggleMobileModal() {
    isMobileModalOpen = !isMobileModalOpen;
  }

  function closeMobileModal() {
    isMobileModalOpen = false;
  }
</script>

<!-- Desktop Sticky Booking Form -->
<div
  class="sticky-booking-form"
  class:visible={isVisible && !isMobile}
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

<!-- Mobile Floating Button -->
{#if isMobile && isVisible && !isUserClosed}
  <button
    class="mobile-booking-button"
    on:click={toggleMobileModal}
    aria-label="Open booking form"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span class="button-text">{$t('booking.book_now')}</span>
  </button>
{/if}

<!-- Mobile Booking Modal -->
{#if isMobile && isMobileModalOpen}
  <div class="mobile-modal-overlay" on:click={closeMobileModal}>
    <div class="mobile-modal" on:click|stopPropagation>
      <div class="mobile-modal-header">
        <Button
          variant="ghost"
          size="small"
          on:click={closeMobileModal}
          ariaLabel="Close booking form"
          class="modal-close-button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </Button>
      </div>
      <div class="mobile-modal-content">
        <BookingWidget type="form" hotelId="beethoven" />
      </div>
    </div>
  </div>
{/if}

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

  /* Mobile Floating Button */
  .mobile-booking-button {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    min-width: 160px;
    height: 48px;
    background: var(--color-secondary);
    color: var(--color-text-inverse);
    border: none;
    border-radius: 48px 48px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
    cursor: pointer;
    z-index: 100;
    box-shadow: 0 -2px 16px rgba(26, 74, 107, 0.4);
    transition: all var(--transition-normal);
    padding: 0 var(--space-lg);
  }

  .mobile-booking-button:hover {
    background: var(--color-secondary-light);
    box-shadow: 0 -4px 20px rgba(26, 74, 107, 0.5);
  }

  .mobile-booking-button:active {
    transform: translateX(-50%) scale(0.95);
  }

  .mobile-booking-button svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .button-text {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    white-space: nowrap;
  }

  /* Mobile Modal Overlay */
  .mobile-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 150;
    display: flex;
    align-items: flex-end;
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Mobile Modal */
  .mobile-modal {
    width: 100%;
    max-height: 90vh;
    background: var(--color-background-elevated);
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    overflow-y: auto;
    animation: slideUp 0.3s ease-out;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .mobile-modal-header {
    position: sticky;
    top: 0;
    background: var(--color-background-elevated);
    padding: var(--space-sm);
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid var(--color-border-light);
    z-index: 10;
  }

  .mobile-modal-content {
    padding: var(--space-md);
  }

  :global(.modal-close-button) {
    width: 32px !important;
    height: 32px !important;
  }
</style>