<script>
  import GoogleMap from "$lib/components/ui/GoogleMap.svelte";

  const hotelEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.5298860995995!2d13.418470313162233!3d52.487647138506624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84fb7f0b53161%3A0xfc1c52db79cab366!2sHotel%20Ludwig%20Van%20Beethoven!5e0!3m2!1sen!2sde!4v1759056233091!5m2!1sen!2sde";

  const addressLines = [
    "Hotel Ludwig van Beethoven",
    "Hasenheide 14",
    "10967 Berlin",
    "Germany"
  ];
</script>

<div class="info-container">
  <div class="container">
    <div class="content-grid">
      <div class="text-section">
        <h1 class="heading-accent">Hotel Information</h1>
        <p>
          Welcome to Hotel Ludwig van Beethoven, your charming retreat in the heart of Berlin-Kreuzberg.
          Our family-run hotel combines traditional hospitality with modern comfort, providing you with
          the perfect base to explore the diverse capital city.
        </p>
        <p>
          For years, we have been welcoming guests from around the world to our lovingly designed hotel.
          Each of our rooms is individually furnished and equipped with everything you need for a
          pleasant stay. Free WiFi, comfortable beds, and a hearty breakfast are naturally part of
          our service.
        </p>
        <p>
          The unique location in Kreuzberg allows you to experience authentic Berlin. Numerous
          restaurants, cafés, galleries, and cultural institutions are in the immediate vicinity.
          The city's main attractions are also easily accessible by public transport.
        </p>
        <p>
          Our dedicated team is happy to provide you with tips and recommendations to make your
          Berlin visit an unforgettable experience. We look forward to welcoming you to our hotel!
        </p>
      </div>

      <GoogleMap
        embedUrl={hotelEmbedUrl}
        title="Hotel Location"
        height="600"
        addressTitle="Address"
        {addressLines}
      />
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