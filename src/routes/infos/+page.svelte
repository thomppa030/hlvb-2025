<script>
  import GoogleMap from "$lib/components/ui/GoogleMap.svelte";

  const hotelEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.5298860995995!2d13.418470313162233!3d52.487647138506624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84fb7f0b53161%3A0xfc1c52db79cab366!2sHotel%20Ludwig%20Van%20Beethoven!5e0!3m2!1sen!2sde!4v1759056233091!5m2!1sen!2sde";
</script>

<div class="info-container">
  <div class="container">
    <div class="content-grid">
      <div class="text-section">
        <h1 class="heading-accent-center">Hotel Informationen</h1>
        <p>
          Willkommen im Hotel Ludwig van Beethoven, Ihrem charmanten Refugium im
          Herzen von Berlin-Kreuzberg. Unser familiengeführtes Hotel verbindet
          traditionelle Gastlichkeit mit modernem Komfort und bietet Ihnen die
          perfekte Basis, um die vielfältige Hauptstadt zu erkunden.
        </p>
        <p>
          Seit Jahren empfangen wir Gäste aus aller Welt in unserem liebevoll
          gestalteten Hotel. Jedes unserer Zimmer ist individuell eingerichtet
          und mit allem ausgestattet, was Sie für einen angenehmen Aufenthalt
          benötigen. Kostenloses WLAN, komfortable Betten und ein reichhaltiges
          Frühstück gehören selbstverständlich zu unserem Service.
        </p>
        <p>
          Die einzigartige Lage in Kreuzberg ermöglicht es Ihnen, das
          authentische Berlin zu erleben. Zahlreiche Restaurants, Cafés,
          Galerien und kulturelle Einrichtungen befinden sich in unmittelbarer
          Nähe. Auch die wichtigsten Sehenswürdigkeiten der Stadt sind bequem
          mit öffentlichen Verkehrsmitteln erreichbar.
        </p>
        <p>
          Unser engagiertes Team steht Ihnen gerne mit Tipps und Empfehlungen
          zur Verfügung, damit Ihr Berlin-Besuch zu einem unvergesslichen
          Erlebnis wird. Wir freuen uns darauf, Sie in unserem Haus begrüßen zu
          dürfen!
        </p>
      </div>

      <GoogleMap embedUrl={hotelEmbedUrl} title="Hotel Standort" height="600" />
    </div>
  </div>
</div>

<style>
  .info-container {
    background-color: var(--color-background);
    padding: var(--space-4xl) 0;
  }

  .container {
    max-width: var(--container-xl);
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4xl);
    align-items: start;
  }

  .text-section h1 {
    font-family: var(--font-display);
    font-size: var(--font-size-4xl);
    margin-bottom: var(--space-xl);
    color: var(--color-text);
  }

  .text-section p {
    font-family: var(--font-primary);
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    margin-bottom: var(--space-lg);
  }

  @media (max-width: 768px) {
    .info-container {
      padding: var(--space-2xl) 0;
    }

    .content-grid {
      grid-template-columns: 1fr;
      gap: var(--space-2xl);
    }

    .text-section h1 {
      font-size: var(--font-size-3xl);
    }
  }
</style>
