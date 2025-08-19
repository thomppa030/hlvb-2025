<!-- src/routes/+page.svelte -->
<script>
  import Button from "$lib/components/ui/Button.svelte";
  import Card from "$lib/components/ui/Card.svelte";
  import BookingWidget from "$lib/components/ui/BookingWidget.svelte";
  
  // Hotel structured data for SEO
  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "Hotel Ludwig van Beethoven",
    "description": "3-star garni hotel in Berlin Kreuzberg with 68 comfortable rooms, free WiFi, and art collection",
    "url": "https://hotellvb.de",
    "telephone": "+49-30-695700-0",
    "email": "info@hotellvb.de",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hasenheide 14",
      "addressLocality": "Berlin",
      "addressRegion": "Berlin",
      "postalCode": "10967",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.4861,
      "longitude": 13.4105
    },
    "starRating": {
      "@type": "Rating",
      "ratingValue": "3"
    },
    "numberOfRooms": 68,
    "checkinTime": "14:00",
    "checkoutTime": "11:00",
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Free WiFi" },
      { "@type": "LocationFeatureSpecification", "name": "Free Parking" },
      { "@type": "LocationFeatureSpecification", "name": "Art Collection" },
      { "@type": "LocationFeatureSpecification", "name": "24/7 Reception" }
    ],
    "priceRange": "€€"
  };
</script>

<svelte:head>
  <title>Hotel Ludwig van Beethoven Berlin | 3-Star Garni Hotel in Kreuzberg</title>
  <meta name="description" content="3-star garni hotel in Berlin Kreuzberg with 68 comfortable rooms, free WiFi, art collection, and personalized service. Best rates guaranteed. Hasenheide 14, 10967 Berlin." />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://hotellvb.de/" />
  <meta property="og:title" content="Hotel Ludwig van Beethoven Berlin | 3-Star Garni Hotel" />
  <meta property="og:description" content="Experience personalized hospitality in Berlin Kreuzberg. 68 comfortable rooms, free WiFi, art collection. Book direct for best rates." />
  <meta property="og:image" content="https://hotellvb.de/hotel-facade.jpg" />
  <meta property="og:locale" content="de_DE" />
  <meta property="og:locale:alternate" content="en_US" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Hotel Ludwig van Beethoven Berlin" />
  <meta name="twitter:description" content="3-star garni hotel in Berlin Kreuzberg. 68 rooms, free WiFi, art collection. Book direct for best rates." />
  <meta name="twitter:image" content="https://hotellvb.de/hotel-facade.jpg" />
  
  <!-- Additional SEO -->
  <meta name="keywords" content="hotel berlin kreuzberg, 3 star hotel berlin, garni hotel, budget hotel kreuzberg, hotel hasenheide, hotel ludwig van beethoven" />
  <link rel="canonical" href="https://hotellvb.de/" />
  <meta name="geo.region" content="DE-BE" />
  <meta name="geo.placename" content="Berlin" />
  <meta name="geo.position" content="52.4861;13.4105" />
  
  <!-- Structured Data -->
  {@html `<script type="application/ld+json">${JSON.stringify(hotelSchema)}</script>`}
</svelte:head>

<div class="home">
  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <h1>Hotel Ludwig van Beethoven</h1>
        <p class="hero-subtitle">
          A personalized 3-star garni hotel experience in the heart of Berlin
          Kreuzberg
        </p>
        <div class="hero-highlights">
          <span class="highlight">68 Comfortable Rooms</span>
          <span class="highlight">Free WiFi</span>
          <span class="highlight">Art Collection</span>
          <span class="highlight">Since 1999</span>
        </div>
        <div class="hero-actions">
          <Button variant="primary" size="large" href="/reviews"
            >Guest Reviews</Button
          >
        </div>
      </div>
    </div>

    <!-- Booking Form at bottom of hero -->
    <div class="hero-booking">
      <div class="container">
        <BookingWidget type="form" hotelId="beethoven" />
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section class="about">
    <div class="container">
      <div class="about-content">
        <div class="about-text">
          <h2>Your Home in Berlin Kreuzberg</h2>
          <p>
            Since 1999, Hotel Ludwig van Beethoven has been welcoming guests to
            one of Berlin's most vibrant neighborhoods. Our family-owned hotel
            offers 68 comfortable rooms, each featuring private bathrooms and
            modern amenities, all enhanced by an extensive art collection.
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
            Experience one of Berlin's most dynamic neighborhoods, known for its
            alternative culture, rich history, and vibrant street life.
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
            Highly rated across all major booking platforms for our personalized
            service, unique atmosphere, and prime Kreuzberg location.
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
</div>

<style>
  .home {
    background-color: var(--color-background);
  }

  /* Hero Section */
  .hero {
    background: linear-gradient(
      135deg,
      var(--color-background-alt) 0%,
      var(--color-background) 100%
    );
    padding: var(--space-5xl) 0 var(--space-4xl);
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse"><circle cx="30" cy="30" r="1.5" fill="currentColor" opacity="0.1"/></pattern></defs><rect width="60" height="60" fill="url(%23dots)"/></svg>');
    color: var(--color-text);
  }

  .hero-content {
    position: relative;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }

  .hero h1 {
    font-size: var(--font-size-5xl);
    margin-bottom: var(--space-lg);
    color: var(--color-text);
  }

  .hero-subtitle {
    font-size: var(--font-size-xl);
    color: var(--color-text-light);
    margin-bottom: var(--space-2xl);
    line-height: var(--line-height-relaxed);
  }

  .hero-highlights {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-md);
    margin-bottom: var(--space-3xl);
  }

  .highlight {
    background: var(--color-background-elevated);
    padding: var(--space-sm) var(--space-lg);
    border-radius: var(--radius-xl);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
    border: 1px solid var(--color-border-light);
    box-shadow: 0 2px 4px rgba(90, 78, 71, 0.08);
  }

  .hero-actions {
    display: flex;
    gap: var(--space-lg);
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero-booking {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    padding: var(--space-2xl) 0;
    margin-top: var(--space-2xl);
  }

  .hero-booking .container {
    max-width: 1400px;
  }

  .hero-booking :global(.booking-widget) {
    max-width: none;
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

  /* Contact Section */
  .contact {
    padding: var(--space-4xl) 0;
  }

  .contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4xl);
    align-items: start;
  }

  .contact-info h2 {
    margin-bottom: var(--space-xl);
    color: var(--color-text);
  }

  .contact-details {
    display: grid;
    gap: var(--space-xl);
  }

  .contact-item h4 {
    color: var(--color-text);
    margin-bottom: var(--space-sm);
    font-weight: var(--font-weight-semibold);
  }

  .contact-item p {
    color: var(--color-text-light);
    line-height: var(--line-height-relaxed);
  }

  .contact-item a {
    color: var(--color-secondary);
    text-decoration: none;
    font-weight: var(--font-weight-medium);
  }

  .contact-item a:hover {
    color: var(--color-secondary-light);
  }

  .contact-cta {
    background: var(--color-background-elevated);
    padding: var(--space-2xl);
    border-radius: var(--radius-xl);
    text-align: center;
    border: 1px solid var(--color-border-light);
    box-shadow: 0 4px 12px rgba(90, 78, 71, 0.08);
  }

  .contact-cta h3 {
    margin-bottom: var(--space-md);
    color: var(--color-text);
  }

  .contact-cta p {
    margin-bottom: var(--space-xl);
    color: var(--color-text-light);
  }

  .cta-buttons {
    display: flex;
    gap: var(--space-md);
    justify-content: center;
    flex-wrap: wrap;
    margin-top: var(--space-xl);
  }

  /* Dark mode adjustments */
  :global([data-theme="dark"]) .hero {
    background: linear-gradient(
      135deg,
      var(--color-background-alt) 0%,
      var(--color-background) 100%
    );
  }

  :global([data-theme="dark"]) .hero-booking {
    background: rgba(42, 37, 31, 0.7);
    border-top-color: rgba(255, 255, 255, 0.06);
  }

  :global([data-theme="dark"]) .highlight {
    background: var(--color-background-alt);
    border-color: var(--color-border);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  :global([data-theme="dark"]) .rating-item {
    background: var(--color-background-alt);
    border-color: var(--color-border);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  :global([data-theme="dark"]) .contact-cta {
    background: var(--color-background-alt);
    border-color: var(--color-border);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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

    .contact-content {
      grid-template-columns: 1fr;
      gap: var(--space-2xl);
    }
  }

  @media (max-width: 768px) {
    .hero {
      padding: var(--space-4xl) 0 var(--space-3xl);
    }

    .hero h1 {
      font-size: var(--font-size-4xl);
    }

    .hero-subtitle {
      font-size: var(--font-size-lg);
    }

    .hero-highlights {
      flex-direction: column;
      align-items: center;
    }

    .hero-actions {
      flex-direction: column;
      align-items: center;
    }

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

    .cta-buttons {
      flex-direction: column;
    }
  }

  @media (max-width: 480px) {
    .hero-highlights {
      gap: var(--space-sm);
    }

    .highlight {
      font-size: var(--font-size-xs);
      padding: var(--space-xs) var(--space-md);
    }
  }
</style>

