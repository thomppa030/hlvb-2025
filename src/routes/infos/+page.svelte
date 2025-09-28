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
  <div class="content-grid">
    <div class="text-section">
      <h1>Hotel Information</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo.
      </p>
      <p>
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
        fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
        sequi nesciunt.
      </p>
    </div>

    <div class="map-section">
      <h2>Our Location</h2>
      {#if mapLoaded}
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2692.4893459947!2d8.029457!3d47.553992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDMzJzE0LjQiTiA4wrAwMSc0Ni4wIkU!5e0!3m2!1sen!2sch!4v1635000000000!5m2!1sen!2sch"
            width="100%"
            height="450"
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

<style>
  .info-container {
    width: 100%;
    padding: var(--spacing-2xl) var(--spacing-xl);
    max-width: 1400px;
    margin: 0 auto;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-3xl);
    align-items: start;
  }

  .text-section h1 {
    font-family: var(--font-serif);
    font-size: var(--text-4xl);
    margin-bottom: var(--spacing-xl);
    color: var(--color-text-primary);
  }

  .text-section p {
    font-family: var(--font-sans);
    font-size: var(--text-base);
    line-height: 1.7;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-lg);
  }

  .map-section h2 {
    font-family: var(--font-serif);
    font-size: var(--text-2xl);
    margin-bottom: var(--spacing-lg);
    color: var(--color-text-primary);
  }

  .map-container {
    width: 100%;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    background: var(--color-background-secondary);
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
    background: var(--color-background-secondary);
    border-radius: var(--radius-lg);
    color: var(--color-text-tertiary);
    font-family: var(--font-sans);
  }

  .address {
    margin-top: var(--spacing-xl);
    padding: var(--spacing-lg);
    background: var(--color-background-secondary);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
  }

  .address h3 {
    font-family: var(--font-serif);
    font-size: var(--text-lg);
    margin-bottom: var(--spacing-md);
    color: var(--color-text-primary);
  }

  .address p {
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    line-height: 1.6;
    color: var(--color-text-secondary);
  }

  @media (max-width: 768px) {
    .info-container {
      padding: var(--spacing-lg) var(--spacing-md);
    }

    .content-grid {
      grid-template-columns: 1fr;
      gap: var(--spacing-2xl);
    }

    .text-section h1 {
      font-size: var(--text-3xl);
    }

    .map-container iframe {
      height: 350px;
    }

    .map-loading {
      height: 350px;
    }
  }
</style>

