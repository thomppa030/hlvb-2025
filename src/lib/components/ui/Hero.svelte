<!-- src/lib/components/ui/Hero.svelte -->
<script>
  import Button from "./Button.svelte";
  import BookingWidget from "./BookingWidget.svelte";
  import { t } from "$lib/stores/i18n.js";

  function handleBooking() {
    window.open("https://onepagebooking.com/beethoven", "_blank");
  }
</script>

<div class="hero-wrapper">
  <section class="hero">
    <div class="hero-image-container">
      <img
        src="/hlvb_backside_header.webp"
        alt="Hotel Ludwig van Beethoven"
        class="hero-image"
      />
      <div class="hero-overlay"></div>
    </div>

    <div class="hero-content">
      <div class="container">
        <h1 class="hero-title">Hotel Ludwig van Beethoven</h1>
        <p class="hero-subtitle">
          {$t("hero.subtitle", "Your luxury retreat in the heart of the city")}
        </p>

        <div class="hero-actions">
          <Button variant="accent" size="large" on:click={handleBooking}>
            {$t("hero.book_now", "Book Your Stay")}
          </Button>
          <Button variant="outline-light" size="large">
            {$t("hero.explore", "Explore")}
          </Button>
        </div>
      </div>
    </div>
    
    <!-- Booking Widget positioned at bottom of hero -->
    <div class="hero-booking">
      <div class="booking-container">
        <BookingWidget type="form" hotelId="beethoven" />
      </div>
    </div>
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

  .hero-image {
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
      rgba(90, 78, 71, 0.4),
      rgba(26, 74, 107, 0.6)
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

  .hero-title {
    font-family: var(--font-display);
    font-size: var(--font-size-5xl);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--space-lg);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    letter-spacing: 0.02em;
    line-height: var(--line-height-tight);
    color: var(--color-text-inverse);
  }

  .hero-subtitle {
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

    .hero-title {
      font-size: var(--font-size-3xl);
    }

    .hero-subtitle {
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

    .hero-title {
      font-size: var(--font-size-2xl);
    }

    .hero-subtitle {
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

