<!-- src/routes/en/infos/arrival/+page.svelte -->
<script>
  import GoogleMap from "$lib/components/ui/GoogleMap.svelte";
  import { t } from "$lib/stores/i18n.js";

  const hotelEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.5298860995995!2d13.418470313162233!3d52.487647138506624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84fb7f0b53161%3A0xfc1c52db79cab366!2sHotel%20Ludwig%20Van%20Beethoven!5e0!3m2!1sen!2sde!4v1759056233091!5m2!1sen!2sde";

  const addressLines = [
    "Hotel Ludwig van Beethoven",
    "Hasenheide 14",
    "10967 Berlin",
    "Germany"
  ];
</script>

<svelte:head>
  <title>Arrival - Hotel Ludwig van Beethoven</title>
  <meta
    name="description"
    content="Getting to Hotel Ludwig van Beethoven Berlin. Information about public transport, parking options and location."
  />
</svelte:head>

<div class="arrival-container">
  <div class="container">
    <h1 class="heading-accent">Getting Here</h1>

    <div class="content-grid">
      <div class="info-section">
        <section class="arrival-section">
          <h2 class="heading-accent">Public Transportation</h2>
          <div class="transport-options">
            <div class="transport-item">
              <h3>🚇 Underground (U-Bahn)</h3>
              <p><strong>U8 Hermannplatz</strong> - only 5 minutes walk from the hotel</p>
              <p>Direct connection to Alexanderplatz, Friedrichstraße and other central locations</p>
            </div>

            <div class="transport-item">
              <h3>🚌 Bus</h3>
              <p><strong>Fontanestraße stop:</strong> Lines M29, M41, 104</p>
              <p><strong>Hermannplatz stop:</strong> Lines M29, M41, 194</p>
            </div>

            <div class="transport-item">
              <h3>🚊 S-Bahn</h3>
              <p><strong>S41/S42 Hermannstraße</strong> - 10 minutes walk</p>
              <p>Ring line with connections in all directions</p>
            </div>
          </div>
        </section>

        <section class="arrival-section">
          <h2 class="heading-accent">From the Airport</h2>

          <div class="airport-routes">
            <div class="route">
              <h3>Berlin Brandenburg Airport (BER)</h3>
              <ol>
                <li>S-Bahn S9 to <strong>Hermannstraße</strong> (approx. 45 min)</li>
                <li>Bus M41 to <strong>Fontanestraße</strong> (3 min)</li>
                <li>2 minutes walk to the hotel</li>
              </ol>
              <p class="route-time">Total time: approx. 55 minutes</p>
            </div>

            <div class="route">
              <h3>Alternative: Taxi/Uber</h3>
              <p>Travel time: 30-45 minutes (depending on traffic)</p>
              <p>Cost: approx. €35-50</p>
            </div>
          </div>
        </section>

        <section class="arrival-section">
          <h2 class="heading-accent">By Car</h2>

          <div class="parking-info">
            <div class="parking-item">
              <h3>🅿️ Parking Options</h3>
              <p><strong>Note:</strong> The hotel does not have its own parking spaces.</p>

              <ul>
                <li><strong>Street parking:</strong> Hasenheide and surrounding areas (charged Mon-Sat 9am-7pm)</li>
                <li><strong>Hasenheide Parking Garage:</strong> 5 minutes walk, approx. €2/hour</li>
                <li><strong>Park & Ride Hermannplatz:</strong> Affordable long-term parking</li>
              </ul>
            </div>

            <div class="parking-item">
              <h3>🛣️ Directions</h3>
              <p><strong>Address for GPS:</strong></p>
              <address>
                Hasenheide 14<br>
                10967 Berlin<br>
                Germany
              </address>
            </div>
          </div>
        </section>

        <section class="arrival-section">
          <h2 class="heading-accent">Check-in Information</h2>

          <div class="checkin-info">
            <div class="info-box">
              <h3>⏰ Times</h3>
              <p><strong>Check-in:</strong> from 3:00 PM</p>
              <p><strong>Check-out:</strong> until 11:00 AM</p>
              <p><em>Early check-in/late check-out available upon request</em></p>
            </div>

            <div class="info-box">
              <h3>🧳 Luggage Storage</h3>
              <p>Free luggage storage:</p>
              <ul>
                <li>Before check-in: from 8:00 AM</li>
                <li>After check-out: until 8:00 PM</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div class="map-column">
        <GoogleMap
          embedUrl={hotelEmbedUrl}
          title="Hotel Ludwig van Beethoven Location"
          height="600"
          addressTitle="Address"
          {addressLines}
        />
      </div>
    </div>
  </div>
</div>

<style>
  .arrival-container {
    background-color: var(--color-background);
    padding: var(--space-5xl) 0;
    min-height: 80vh;
  }

  .container {
    max-width: var(--container-xl);
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  h1.heading-accent {
    font-family: var(--font-display);
    font-size: clamp(var(--font-size-3xl), 5vw, var(--font-size-5xl));
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-4xl);
    text-align: center;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr 450px;
    gap: var(--space-4xl);
    align-items: start;
  }

  .arrival-section {
    margin-bottom: var(--space-4xl);
    padding-bottom: var(--space-4xl);
    border-bottom: 1px solid var(--color-border-light);
  }

  .arrival-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  h2.heading-accent {
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: var(--space-xl);
    letter-spacing: -0.01em;
  }

  h3 {
    font-family: var(--font-display);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: var(--space-md);
  }

  .transport-options {
    display: grid;
    gap: var(--space-xl);
  }

  .transport-item {
    background: var(--color-background-elevated);
    padding: var(--space-xl);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-light);
  }

  .airport-routes {
    display: grid;
    gap: var(--space-xl);
  }

  .route {
    background: var(--color-background-elevated);
    padding: var(--space-xl);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-light);
  }

  .route ol {
    margin: var(--space-md) 0;
    padding-left: var(--space-xl);
  }

  .route li {
    margin-bottom: var(--space-sm);
    line-height: var(--line-height-relaxed);
  }

  .route-time {
    color: var(--color-secondary);
    font-weight: var(--font-weight-semibold);
    margin-top: var(--space-md);
  }

  .parking-info {
    display: grid;
    gap: var(--space-xl);
  }

  .parking-item {
    background: var(--color-background-elevated);
    padding: var(--space-xl);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-light);
  }

  .parking-item ul {
    margin: var(--space-md) 0;
    padding-left: var(--space-xl);
  }

  .parking-item li {
    margin-bottom: var(--space-sm);
    line-height: var(--line-height-relaxed);
  }

  address {
    background: var(--color-background-alt);
    padding: var(--space-md);
    border-radius: var(--radius-md);
    border-left: 3px solid var(--color-secondary);
    font-style: normal;
    line-height: var(--line-height-relaxed);
    margin-top: var(--space-md);
  }

  .checkin-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
  }

  .info-box {
    background: var(--color-background-elevated);
    padding: var(--space-xl);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-light);
  }

  .info-box ul {
    margin: var(--space-md) 0;
    padding-left: var(--space-xl);
  }

  .info-box li {
    margin-bottom: var(--space-sm);
  }

  p {
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    margin-bottom: var(--space-md);
  }

  strong {
    color: var(--color-text);
    font-weight: var(--font-weight-semibold);
  }

  em {
    color: var(--color-text-light);
    font-style: italic;
  }

  /* Mobile responsive */
  @media (max-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr;
      gap: var(--space-3xl);
    }

    .map-column {
      order: -1;
    }
  }

  @media (max-width: 768px) {
    .arrival-container {
      padding: var(--space-4xl) 0;
    }

    .container {
      padding: 0 var(--space-md);
    }

    .checkin-info {
      grid-template-columns: 1fr;
      gap: var(--space-lg);
    }

    .transport-item,
    .route,
    .parking-item,
    .info-box {
      padding: var(--space-lg);
    }

    h1.heading-accent {
      margin-bottom: var(--space-3xl);
    }

    h2.heading-accent {
      font-size: var(--font-size-xl);
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 var(--space-sm);
    }

    .arrival-section {
      margin-bottom: var(--space-3xl);
      padding-bottom: var(--space-3xl);
    }
  }
</style>