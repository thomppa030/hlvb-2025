<!-- src/routes/+page.svelte -->
<script>
  import Button from "$lib/components/ui/Button.svelte";
  import Card from "$lib/components/ui/Card.svelte";
  import BookingWidget from "$lib/components/ui/BookingWidget.svelte";
  import Hero from "$lib/components/ui/Hero.svelte";
  import SliceZone from "$lib/components/SliceZone.svelte";
  import { currentLanguage } from "$lib/stores/i18n.js";
  import { onMount } from "svelte";

  export let data;

  // Set language from the loaded data, but respect current language preference
  onMount(() => {
    if (data.lang) {
      // Only switch if we're not already on the preferred language
      currentLanguage.update(current => {
        // If we're on home page and user already has a language preference, don't override
        if (typeof localStorage !== 'undefined') {
          const storedLang = localStorage.getItem('language');
          if (storedLang && ['de', 'en'].includes(storedLang)) {
            return storedLang;
          }
        }
        return data.lang;
      });
    }
  });

  // Use Prismic content if available, otherwise fall back to static content
  $: usePrismic = data.homepage && data.slices && data.slices.length > 0;

  // Hotel structured data for SEO
  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "Hotel Ludwig van Beethoven",
    description:
      "3-star garni hotel in Berlin Kreuzberg with 68 comfortable rooms, free WiFi, and art collection",
    url: "https://hotellvb.de",
    telephone: "+49-30-695700-0",
    email: "info@hotellvb.de",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hasenheide 14",
      addressLocality: "Berlin",
      addressRegion: "Berlin",
      postalCode: "10967",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.4861,
      longitude: 13.4105,
    },
    starRating: {
      "@type": "Rating",
      ratingValue: "3",
    },
    numberOfRooms: 68,
    checkinTime: "14:00",
    checkoutTime: "11:00",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free WiFi" },
      { "@type": "LocationFeatureSpecification", name: "Free Parking" },
      { "@type": "LocationFeatureSpecification", name: "Art Collection" },
      { "@type": "LocationFeatureSpecification", name: "24/7 Reception" },
    ],
    priceRange: "€€",
  };
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta name="description" content={data.meta.description} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta
    property="og:url"
    content="https://hotellvb.de{data.lang === 'en' ? '/en' : ''}"
  />
  <meta property="og:title" content={data.meta.title} />
  <meta property="og:description" content={data.meta.description} />
  <meta property="og:image" content="https://hotellvb.de{data.meta.image}" />
  <meta property="og:locale" content="de_DE" />
  <meta property="og:locale:alternate" content="en_US" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={data.meta.title} />
  <meta name="twitter:description" content={data.meta.description} />
  <meta name="twitter:image" content="https://hotellvb.de{data.meta.image}" />

  <!-- Additional SEO -->
  <meta
    name="keywords"
    content="hotel berlin kreuzberg, 3 star hotel berlin, garni hotel, budget hotel kreuzberg, hotel hasenheide, hotel ludwig van beethoven"
  />
  <link rel="canonical" href="https://hotellvb.de/" />
  <meta name="geo.region" content="DE-BE" />
  <meta name="geo.placename" content="Berlin" />
  <meta name="geo.position" content="52.4861;13.4105" />

  <!-- Structured Data -->
  {@html `<script type="application/ld+json">${JSON.stringify(hotelSchema)}</script>`}
</svelte:head>

<div class="home">
  {#if usePrismic}
    <!-- Use Prismic slices -->
    <SliceZone slices={data.slices} />
  {:else}
    <!-- Fallback to static content -->
    <!-- Hero Section with integrated booking widget -->
    <Hero />

    <!-- About Section -->
    <section class="about">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2>Your Home in Berlin Kreuzberg</h2>
            <p>
              Since 1999, Hotel Ludwig van Beethoven has been welcoming guests
              to one of Berlin's most vibrant neighborhoods. Our family-owned
              hotel offers 68 comfortable rooms, each featuring private
              bathrooms and modern amenities, all enhanced by an extensive art
              collection.
            </p>
            <p>
              Located at Hasenheide 14, we're perfectly positioned for exploring
              authentic Berlin culture while providing the personal touch that
              makes every stay memorable.
            </p>
          </div>
          <div class="hotel-stats">
            <div class="stat-item">
              <div class="stat-number">68</div>
              <div class="stat-label">Comfortable Rooms</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">1999</div>
              <div class="stat-label">Since</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">3★</div>
              <div class="stat-label">Garni Hotel</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Amenities Section -->
    <section class="amenities">
      <div class="container">
        <h2>Hotel Amenities</h2>
        <div class="amenities-grid">
          <div class="amenity-item">
            <div class="amenity-icon">WIFI</div>
            <h3>Free WiFi</h3>
            <p>High-speed internet in all rooms and public areas</p>
          </div>

          <div class="amenity-item">
            <div class="amenity-icon">PARK</div>
            <h3>Free Parking</h3>
            <p>Limited spaces with parking pass from reception</p>
          </div>

          <div class="amenity-item">
            <div class="amenity-icon">ART</div>
            <h3>Art Collection</h3>
            <p>Artwork by Maxim and Milan D. Vukotic throughout the hotel</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Location & Neighborhood -->
    <section class="location">
      <div class="container">
        <div class="location-content">
          <div class="location-text">
            <h2>Discover Kreuzberg</h2>
            <p>
              Experience one of Berlin's most dynamic neighborhoods, known for
              its alternative culture, rich history, and vibrant street life.
              Kreuzberg offers excellent transport connections, unique local
              attractions, and authentic Berlin experiences right at your
              doorstep.
            </p>
            <div class="location-highlights">
              <span class="location-highlight">Alternative Culture</span>
              <span class="location-highlight">Rich History</span>
              <span class="location-highlight">Great Transport</span>
              <span class="location-highlight">Local Attractions</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Guest Reviews Summary -->
    <section class="reviews-summary">
      <div class="container">
        <div class="reviews-content">
          <div class="reviews-text">
            <h2>What Our Guests Say</h2>
            <p>
              Highly rated across all major booking platforms for our
              personalized service, unique atmosphere, and prime Kreuzberg
              location.
            </p>
            <Button variant="secondary" size="large" href="/reviews"
              >Read All Reviews</Button
            >
          </div>
          <div class="ratings-grid">
            <div class="rating-item">
              <div class="rating-score">4.3/5</div>
              <div class="rating-source">Google</div>
            </div>
            <div class="rating-item">
              <div class="rating-score">4.5/5</div>
              <div class="rating-source">TripAdvisor</div>
            </div>
            <div class="rating-item">
              <div class="rating-score">8.6/10</div>
              <div class="rating-source">HRS</div>
            </div>
            <div class="rating-item">
              <div class="rating-score">8.5/10</div>
              <div class="rating-source">Booking.com</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  {/if}
</div>

<style>
  .home {
    background-color: var(--color-background);
  }

  /* About Section */
  .about {
    padding: var(--space-4xl) 0;
  }

  .about-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: var(--space-4xl);
    align-items: start;
  }

  .about-text h2 {
    margin-bottom: var(--space-xl);
    color: var(--color-text);
  }

  .about-text p {
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    margin-bottom: var(--space-lg);
  }

  .hotel-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-lg);
  }

  .stat-item {
    text-align: center;
    background: var(--color-background-elevated);
    padding: var(--space-xl);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-light);
    box-shadow: 0 2px 8px rgba(90, 78, 71, 0.08);
  }

  .stat-number {
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-accent);
    margin-bottom: var(--space-xs);
    font-family: var(--font-display);
  }

  .stat-label {
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
    font-weight: var(--font-weight-medium);
  }

  /* Amenities Section */
  .amenities {
    padding: var(--space-4xl) 0;
    background: var(--color-background-alt);
  }

  .amenities h2 {
    text-align: center;
    margin-bottom: var(--space-3xl);
    color: var(--color-text);
  }

  .amenities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-xl);
    max-width: 900px;
    margin: 0 auto;
  }

  .amenity-item {
    text-align: center;
    background: var(--color-background-elevated);
    padding: var(--space-2xl);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-light);
    box-shadow: 0 2px 8px rgba(90, 78, 71, 0.08);
  }

  .amenity-icon {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    font-family: var(--font-mono);
    color: var(--color-secondary);
    background: rgba(26, 74, 107, 0.1);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
    margin-bottom: var(--space-lg);
    display: inline-block;
    letter-spacing: 0.1em;
    border: 1px solid rgba(26, 74, 107, 0.2);
  }

  .amenity-item h3 {
    margin-bottom: var(--space-md);
    color: var(--color-text);
  }

  .amenity-item p {
    color: var(--color-text-light);
    line-height: var(--line-height-relaxed);
  }

  /* Location Section */
  .location {
    padding: var(--space-4xl) 0;
  }

  .location-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  .location-text h2 {
    margin-bottom: var(--space-xl);
    color: var(--color-text);
  }

  .location-text p {
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    margin-bottom: var(--space-xl);
  }

  .location-highlights {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-md);
  }

  .location-highlight {
    background: var(--color-background-alt);
    padding: var(--space-sm) var(--space-lg);
    border-radius: var(--radius-xl);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
    border: 1px solid var(--color-border-light);
  }

  /* Reviews Summary Section */
  .reviews-summary {
    padding: var(--space-4xl) 0;
    background: var(--color-background-alt);
  }

  .reviews-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4xl);
    align-items: center;
  }

  .reviews-text h2 {
    margin-bottom: var(--space-lg);
    color: var(--color-text);
  }

  .reviews-text p {
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
    color: var(--color-text-light);
    margin-bottom: var(--space-xl);
  }

  .ratings-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-md);
  }

  .rating-item {
    background: var(--color-background-elevated);
    padding: var(--space-lg);
    border-radius: var(--radius-lg);
    text-align: center;
    border: 1px solid var(--color-border-light);
    box-shadow: 0 2px 8px rgba(90, 78, 71, 0.08);
  }

  .rating-score {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-accent);
    margin-bottom: var(--space-xs);
  }

  .rating-source {
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
    font-weight: var(--font-weight-medium);
  }

  /* Removed unused Contact Section styles */

  /* Dark mode adjustments */

  :global([data-theme="dark"]) .rating-item {
    background: var(--color-background-alt);
    border-color: var(--color-border);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }


  :global([data-theme="dark"]) .stat-item {
    background: var(--color-background-alt);
    border-color: var(--color-border);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  :global([data-theme="dark"]) .amenity-item {
    background: var(--color-background-alt);
    border-color: var(--color-border);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  :global([data-theme="dark"]) .amenity-icon {
    background: rgba(74, 122, 158, 0.15);
    border-color: rgba(74, 122, 158, 0.3);
    color: var(--color-secondary-light);
  }

  :global([data-theme="dark"]) .location-highlight {
    background: var(--color-background);
    border-color: var(--color-border);
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .about-content {
      grid-template-columns: 1fr;
      gap: var(--space-2xl);
    }

    .reviews-content {
      grid-template-columns: 1fr;
      gap: var(--space-2xl);
    }

  }

  @media (max-width: 768px) {
    .hotel-stats {
      grid-template-columns: 1fr;
      gap: var(--space-md);
    }

    .amenities-grid {
      grid-template-columns: 1fr;
    }

    .location-highlights {
      flex-direction: column;
      align-items: center;
    }

    .ratings-grid {
      grid-template-columns: 1fr;
    }

  }

  @media (max-width: 480px) {
  }
</style>
