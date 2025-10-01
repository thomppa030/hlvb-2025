<!-- src/routes/infos/anreise/+page.svelte -->
<script>
  import SliceZone from "$lib/components/SliceZone.svelte";
  import GoogleMap from "$lib/components/ui/GoogleMap.svelte";
  import Icon from "$lib/components/ui/Icon.svelte";

  export let data;

  const hotelEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.5298860995995!2d13.418470313162233!3d52.487647138506624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84fb7f0b53161%3A0xfc1c52db79cab366!2sHotel%20Ludwig%20Van%20Beethoven!5e0!3m2!1sen!2sde!4v1759056233091!5m2!1sen!2sde";
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  {#if data.meta.description}
    <meta name="description" content={data.meta.description} />
  {/if}
</svelte:head>

{#if data.slices && data.slices.length > 0}
  <SliceZone slices={data.slices} />
{:else}
  <!-- Fallback content when no Prismic data -->

  <div class="arrival-container">
    <div class="container">
      <h1 class="heading-accent-center">Anreise</h1>

      <div class="content-grid">
        <div class="info-section">
          <section class="arrival-section">
            <h2 class="heading-accent">Mit öffentlichen Verkehrsmitteln</h2>
            <div class="transport-options">
              <div class="transport-item">
                <h3><Icon name="metro" size={48} /> U-Bahn</h3>
                <p>
                  <strong>U8/U7 Hermannplatz</strong> - nur 5 Gehminuten vom Hotel
                  entfernt
                </p>
                <p>
                  Direktverbindung zu Alexanderplatz, nur 15 Minuten in die
                  Innenstadt.
                </p>
              </div>

              <div class="transport-item">
                <h3><Icon name="bus" size={48} /> Bus</h3>
                <p>
                  <strong>Haltestelle Jahnstraße:</strong> Linien M41
                </p>
                <p>
                  <strong>Haltestelle Hermannplatz:</strong> Linien M29, M41, 194
                </p>
              </div>

              <div class="transport-item">
                <h3><Icon name="metro" size={48} /> S-Bahn</h3>
                <p><strong>S41/S42 Hermannstraße</strong> - 10 Gehminuten</p>
                <p>Ringbahn mit Verbindungen in alle Richtungen</p>
              </div>
            </div>
          </section>

          <section class="arrival-section">
            <h2 class="heading-accent">Vom Flughafen</h2>

            <div class="airport-routes">
              <div class="route">
                <h3><Icon name="airport" size={48} />Flughafen BER</h3>
                <ol>
                  <li>
                    S-Bahn S9 bis <strong>Hermannstraße</strong> (ca. 45 Min.)
                  </li>
                  <li>U-Bahn U8 bis <strong>Hermannplatz</strong> (3 Min.)</li>
                  <li>2 Minuten Fußweg zum Hotel</li>
                </ol>
                <p class="route-time">Gesamtzeit: ca. 55 Minuten</p>
              </div>

              <div class="route">
                <h3>Alternative: Taxi/Uber</h3>
                <p>Fahrtzeit: 30-45 Minuten (je nach Verkehr)</p>
                <p>Kosten: ca. 45-50€</p>
              </div>
            </div>
          </section>

          <section class="arrival-section">
            <h2 class="heading-accent">Mit dem Auto</h2>

            <div class="parking-info">
              <div class="parking-item">
                <h3><Icon name="parking" size={48} /> Parkmöglichkeiten</h3>
                <p>
                  Das Hotel verfügt über eine <strong>begrenzte</strong> Anzahl
                  an Parkplätzen. Diese können
                  <strong>nach Verfügbarkeit</strong>
                  gegen Hinterlegung einer Kaution an der Rezeption genutzt
                  werden. Bei Rückgabe des Parkausweises erhalten Sie Ihre
                  Kaution zurück.
                  <strong
                    >Eine Reservierung der Parkplätze ist nicht möglich.</strong
                  >
                </p>

                <p>
                  <strong>Weitere Parkmöglichkeiten:</strong>
                </p>

                <ul>
                  <li>
                    <strong>Parkhaus Karstadt:</strong> 5,00 € pro Tag
                  </li>
                  <li>
                    <strong>Huxleys neue Welt:</strong> 8,00 € pro Tag
                  </li>
                  <li>
                    <strong>Straßenparkplätze:</strong> Hasenheide und Umgebung,
                    27,00 € pro Tag
                  </li>
                </ul>
              </div>

              <div class="parking-item">
                <h3><!-- TODO: Add Road/Navigation icon SVG --> Anfahrt</h3>
                <p><strong>Adresse für Navigationssystem:</strong></p>
                <address>
                  Hasenheide 14<br />
                  10967 Berlin
                </address>
              </div>
            </div>
          </section>

          <section class="arrival-section">
            <h2 class="heading-accent">Check-in Informationen</h2>

            <div class="checkin-info">
              <div class="info-box">
                <h3><!-- TODO: Add Clock icon SVG --> Zeiten</h3>
                <p><strong>Check-in:</strong> ab 15:00 Uhr</p>
                <p><strong>Check-out:</strong> bis 11:00 Uhr</p>
                <p>
                  <em
                    >Früher Check-in/später Check-out nach Verfügbarkeit möglich</em
                  >
                </p>
              </div>

              <div class="info-box">
                <h3><!-- TODO: Add Luggage icon SVG --> Gepäckaufbewahrung</h3>
                <p>Kostenlose Gepäckaufbewahrung:</p>
                <ul>
                  <li>Vor Check-in: ab 7:00 Uhr</li>
                  <li>Nach Check-out: bis 23:00 Uhr</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div class="map-column">
          <GoogleMap
            embedUrl={hotelEmbedUrl}
            title="Hotel Ludwig van Beethoven Standort"
            height="600"
          />
        </div>
      </div>
    </div>
  </div>
{/if}

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

  h1.heading-accent-center {
    font-family: var(--font-display);
    font-size: clamp(var(--font-size-3xl), 5vw, var(--font-size-5xl));
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-4xl);
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
    display: flex;
    align-items: center;
    gap: var(--space-sm);
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
