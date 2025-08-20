<!-- src/lib/slices/HeroSlice.svelte -->
<script>
  import { PrismicRichText, PrismicImage } from '@prismicio/svelte';
  import BookingWidget from '../components/ui/BookingWidget.svelte';
  import OptimizedImage from '../components/ui/OptimizedImage.svelte';

  export let slice;

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
          fetchpriority="high"
          sizes="100vw"
          imgixParams={{ 
            fit: 'crop', 
            q: 75,
            w: 2560,
            h: 1440,
            fm: 'webp'
          }}
        />
      {:else}
        <!-- Fallback optimized image -->
        <OptimizedImage
          src="/hlvb_backside_header.webp"
          mobileSrc="/hlvb_backside_header_mobile.webp"
          alt="Hotel Ludwig van Beethoven Berlin - Exterior view"
          class_="hero-image"
          width={1920}
          height={799}
          fetchpriority="high"
          loading="eager"
          placeholder="linear-gradient(135deg, #5a4e47, #7c6b65)"
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
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    z-index: 0;
    max-width: 2560px;
  }

  .hero-image-container :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    aspect-ratio: 1920 / 799;
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
    padding: var(--space-2xl) var(--space-xl);
    padding-bottom: calc(var(--space-4xl) + 80px); /* Extra padding to ensure buttons don't overlap with booking widget */
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
  }

  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2xl);
  }

  .hero-title :global(h1) {
    font-family: var(--font-display);
    font-size: clamp(var(--font-size-4xl), 6vw, 4.5rem);
    font-weight: var(--font-weight-bold);
    margin: 0;
    text-shadow: 2px 4px 12px rgba(0, 0, 0, 0.5);
    letter-spacing: -0.02em;
    line-height: 1.05;
    color: white;
    text-align: center;
  }

  .hero-subtitle :global(p) {
    font-family: var(--font-primary);
    font-size: clamp(var(--font-size-lg), 2.2vw, var(--font-size-2xl));
    font-weight: var(--font-weight-normal);
    margin: 0;
    text-shadow: 1px 2px 6px rgba(0, 0, 0, 0.4);
    max-width: 750px;
    line-height: var(--line-height-relaxed);
    color: rgba(255, 255, 255, 0.92);
    text-align: center;
    opacity: 0.95;
  }


  /* Hero Booking Widget */
  .hero-booking {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(25%); /* Reduced from 50% to nudge widget up on 1080p */
    z-index: 2;
  }

  .booking-container {
    max-width: 1380px; /* Increased by 15% from 1200px */
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .hero-booking :global(.booking-widget) {
    background: var(--color-background-elevated);
    box-shadow: var(--shadow-xl);
    border-radius: var(--radius-xl);
    border: 1px solid var(--color-border-light);
  }


  /* Tablet responsive */
  @media (max-width: 1024px) {
    .hero-content {
      padding: var(--space-xl) var(--space-lg);
      padding-bottom: calc(var(--space-3xl) + 70px);
      min-height: 45vh;
    }

    .container {
      gap: var(--space-xl);
    }
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .hero-wrapper {
      margin-bottom: calc(var(--space-3xl) + var(--space-xl));
    }

    .hero {
      height: 75vh;
      min-height: 550px;
    }

    .hero-content {
      padding: var(--space-xl) var(--space-md);
      padding-bottom: calc(var(--space-2xl) + 60px);
      min-height: 40vh;
    }

    .container {
      gap: var(--space-xl);
    }


    .booking-container {
      padding: 0 var(--space-md);
    }

    .hero-booking {
      transform: translateY(20%);
    }
  }

  /* Small mobile */
  @media (max-width: 480px) {
    .hero-wrapper {
      margin-bottom: calc(var(--space-2xl) + var(--space-xl));
    }

    .hero {
      height: 70vh;
      min-height: 500px;
    }

    .hero-content {
      padding: var(--space-lg) var(--space-sm);
      padding-bottom: calc(var(--space-xl) + 50px);
      min-height: 35vh;
    }

    .container {
      gap: var(--space-lg);
    }


    .hero-booking {
      transform: translateY(20%);
    }
  }

  /* Extra small screens */
  @media (max-width: 360px) {
    .hero {
      min-height: 450px;
    }

    .hero-content {
      padding: var(--space-md) var(--space-xs);
    }
  }
</style>