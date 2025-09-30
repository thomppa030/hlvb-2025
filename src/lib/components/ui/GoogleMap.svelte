<!-- src/lib/components/ui/GoogleMap.svelte -->
<script>
  import { onMount } from "svelte";
  import { t } from "$lib/stores/i18n.js";

  export let embedUrl = "";
  export let title = "Map";
  export let width = "450";
  export let height = "600";
  export let showAddress = true;
  export let addressTitle = "";
  export let addressLines = [];
  export let loadingDelay = 100;

  let mapLoaded = false;

  onMount(() => {
    // Delay map loading for better performance
    setTimeout(() => {
      mapLoaded = true;
    }, loadingDelay);
  });

  // Default address data
  $: finalAddressTitle = addressTitle || $t('map.address');
  $: finalAddressLines = addressLines.length > 0 ? addressLines : [
    "Hotel Ludwig van Beethoven",
    "Hasenheide 14",
    "10967 Berlin",
    "Deutschland"
  ];
</script>

<div class="map-section">
  <h2 class="heading-accent">{$t('map.location')}</h2>
  {#if mapLoaded}
    <div class="map-container">
      <iframe
        src={embedUrl}
        {width}
        {height}
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        {title}
      ></iframe>
    </div>
  {:else}
    <div class="map-loading" style="height: {height}px;">
      {$t('map.loading')}
    </div>
  {/if}

  {#if showAddress}
    <div class="address">
      <h3>{finalAddressTitle}</h3>
      <p>
        {#each finalAddressLines as line}
          {line}<br />
        {/each}
      </p>
    </div>
  {/if}
</div>

<style>
  .map-section {
    background: var(--color-background-elevated);
    padding: var(--space-2xl);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-light);
    box-shadow: 0 2px 8px rgba(90, 78, 71, 0.08);
  }

  .map-section h2.heading-accent {
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    margin: 0 0 var(--space-lg) 0;
    color: var(--color-text);
    letter-spacing: -0.01em;
  }

  .map-container {
    width: 100%;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    background: var(--color-background-alt);
  }

  .map-container iframe {
    width: 100%;
    display: block;
    border-radius: var(--radius-lg);
  }

  .map-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-background-alt);
    border-radius: var(--radius-lg);
    color: var(--color-text-light);
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
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
    font-weight: var(--font-weight-semibold);
    margin: 0 0 var(--space-md) 0;
    color: var(--color-text);
  }

  .address p {
    font-family: var(--font-primary);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-relaxed);
    color: var(--color-text-light);
    margin: 0;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .map-section {
      padding: var(--space-xl);
    }

    .map-container iframe {
      height: 350px !important;
    }

    .map-loading {
      height: 350px !important;
    }
  }

  @media (max-width: 480px) {
    .map-section {
      padding: var(--space-lg);
    }

    .map-section h2.heading-accent {
      font-size: var(--font-size-xl);
    }
  }
</style>