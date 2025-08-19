<!-- src/lib/slices/HeroSlice.svelte -->
<script>
  import { PrismicRichText, PrismicImage } from '@prismicio/svelte';
  import Button from '../components/ui/Button.svelte';
  import BookingWidget from '../components/ui/BookingWidget.svelte';

  export let slice;

  function handleBooking() {
    const bookingUrl = slice.primary.booking_url?.url || "https://onepagebooking.com/beethoven";
    window.open(bookingUrl, "_blank");
  }

  // Extract data from slice with fallbacks
  $: heroData = {
    title: slice.primary.title || [{ type: 'heading1', text: 'Hotel Ludwig van Beethoven', spans: [] }],
    subtitle: slice.primary.subtitle || [{ type: 'paragraph', text: 'Your luxury retreat in the heart of the city', spans: [] }],
    background_image: slice.primary.background_image,
    primary_button_text: slice.primary.primary_button_text || 'Book Your Stay',
    secondary_button_text: slice.primary.secondary_button_text || 'Explore',
    show_booking_widget: slice.primary.show_booking_widget !== false
  };
</script>

<div class="hero-wrapper">
  <section class="hero">
    <div class="hero-image-container">
      {#if heroData.background_image?.url}
        <PrismicImage 
          field={heroData.background_image} 
          class="hero-image" 
          loading="eager"
          sizes="100vw"
        />
      {:else}
        <!-- Fallback image -->
        <img 
          src="/hlvb_backside_header.webp" 
          alt="Hotel Ludwig van Beethoven" 
          class="hero-image"
        />
      {/if}
      <div class="hero-overlay"></div>
    </div>

    <div class="hero-content">
      <div class="container">
        <div class="hero-title">
          <PrismicRichText field={heroData.title} />
        </div>
        
        <div class="hero-subtitle">
          <PrismicRichText field={heroData.subtitle} />
        </div>

        <div class="hero-actions">
          <Button variant="accent" size="large" on:click={handleBooking}>
            {heroData.primary_button_text}
          </Button>
          <Button variant="outline-light" size="large">
            {heroData.secondary_button_text}
          </Button>
        </div>
      </div>
    </div>
    
    <!-- Booking Widget positioned at bottom of hero -->
    {#if heroData.show_booking_widget}
      <div class="hero-booking">
        <div class="booking-container">
          <BookingWidget type="form" hotelId="beethoven" />
        </div>
      </div>
    {/if}
  </section>
</div>

<style>
  .hero-wrapper {
    position: relative;
    margin-bottom: calc(var(--space-4xl) + var(--space-2xl)); /* Account for booking widget extending outside */
  }

  .hero {
    position: relative;
    width: 100%;
    height: 80vh;
    min-height: 600px;
    overflow: visible;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-image-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .hero-image-container :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(26, 74, 107, 0.4),
      rgba(90, 78, 71, 0.6)
    );
  }

  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    color: white;
    padding: var(--space-xl);
    width: 100%;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .hero-title :global(h1) {
    font-family: var(--font-display);
    font-size: var(--font-size-5xl);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--space-lg);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    letter-spacing: 0.02em;
    line-height: var(--line-height-tight);
    color: var(--color-text-inverse);
  }

  .hero-subtitle :global(p) {
    font-family: var(--font-primary);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-normal);
    margin-bottom: var(--space-2xl);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: var(--line-height-relaxed);
    color: var(--color-text-inverse);
  }

  .hero-actions {
    display: flex;
    gap: var(--space-lg);
    justify-content: center;
    align-items: center;
  }

  /* Hero Booking Widget */
  .hero-booking {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(50%);
    z-index: 2;
  }

  .booking-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .hero-booking :global(.booking-widget) {
    background: var(--color-background-elevated);
    box-shadow: var(--shadow-xl);
    border-radius: var(--radius-xl);
    border: 1px solid var(--color-border-light);
  }

  /* Dark mode adjustments for booking widget */
  :global([data-theme="dark"]) .hero-booking :global(.booking-widget) {
    background: var(--color-background-elevated);
    border-color: var(--color-border);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .hero-wrapper {
      margin-bottom: calc(var(--space-3xl) + var(--space-xl)); /* Adjusted for mobile booking widget */
    }

    .hero {
      height: 70vh;
      min-height: 500px;
    }

    .hero-title :global(h1) {
      font-size: var(--font-size-3xl);
    }

    .hero-subtitle :global(p) {
      font-size: var(--font-size-base);
      margin-bottom: var(--space-xl);
    }

    .hero-actions {
      flex-direction: column;
      gap: var(--space-md);
    }

    .hero-actions :global(.btn) {
      width: 100%;
      max-width: 300px;
    }

    .booking-container {
      padding: 0 var(--space-md);
    }

    .hero-booking {
      transform: translateY(40%);
    }
  }

  @media (max-width: 480px) {
    .hero-wrapper {
      margin-bottom: calc(var(--space-2xl) + var(--space-xl)); /* Adjusted for smaller mobile booking widget */
    }

    .hero {
      height: 60vh;
      min-height: 400px;
    }

    .hero-title :global(h1) {
      font-size: var(--font-size-2xl);
    }

    .hero-subtitle :global(p) {
      font-size: var(--font-size-sm);
    }

    .hero-content {
      padding: var(--space-lg);
    }

    .hero-booking {
      transform: translateY(30%);
    }
  }
</style>