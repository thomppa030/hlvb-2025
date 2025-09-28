<script>
  import { onMount } from "svelte";

  let mapLoaded = false;

  onMount(() => {
    // Delay map loading for better performance
    setTimeout(() => {
      mapLoaded = true;
    }, 100);
  });
</script>

<div class="info-container">
  <div class="container">
    <div class="content-grid">
      <div class="text-section">
        <h1 class="heading-accent">Hotel Information</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt.
        </p>
      </div>

      <div class="map-section">
        <h2 class="heading-accent">Our Location</h2>
        {#if mapLoaded}
          <div class="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.5298860995995!2d13.418470313162233!3d52.487647138506624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84fb7f0b53161%3A0xfc1c52db79cab366!2sHotel%20Ludwig%20Van%20Beethoven!5e0!3m2!1sen!2sde!4v1759056233091!5m2!1sen!2sde"
              width="450"
              height="600"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Hotel Location"
            ></iframe>
          </div>
        {:else}
          <div class="map-loading">Loading map...</div>
        {/if}
        <div class="address">
          <h3>Address</h3>
          <p>
            Hotel Ludwig van Beethoven<br />
            Hasenheide 14<br />
            10967 Berlin<br />
            Deutschland
          </p>
        </div>
      </div>
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

  .map-section {
    background: var(--color-background-elevated);
    padding: var(--space-2xl);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-light);
    box-shadow: 0 2px 8px rgba(90, 78, 71, 0.08);
  }

  .map-section h2 {
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    margin-bottom: var(--space-lg);
    color: var(--color-text);
  }

  .map-container {
    width: 100%;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    background: var(--color-background-alt);
  }

  .map-container iframe {
    display: block;
    border-radius: var(--radius-lg);
  }

  .map-loading {
    height: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-background-alt);
    border-radius: var(--radius-lg);
    color: var(--color-text-light);
    font-family: var(--font-primary);
  }

  .address {
    margin-top: var(--space-xl);
    padding: var(--space-lg);
    background: var(--color-background-alt);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border-light);
  }

  .address h3 {
    font-family: var(--font-display);
    font-size: var(--font-size-lg);
    margin-bottom: var(--space-md);
    color: var(--color-text);
  }

  .address p {
    font-family: var(--font-primary);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-relaxed);
    color: var(--color-text-light);
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

    .map-section {
      padding: var(--space-xl);
    }

    .map-container iframe {
      height: 350px;
    }

    .map-loading {
      height: 350px;
    }
  }
</style>
