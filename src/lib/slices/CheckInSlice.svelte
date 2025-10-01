<!-- src/lib/slices/CheckInSlice.svelte -->
<script>
  import { PrismicRichText } from '@prismicio/svelte';

  export let slice;
</script>

<section class="checkin-slice">
  <div class="container">
    {#if slice.primary.heading}
      <h2 class="heading-accent">{slice.primary.heading}</h2>
    {/if}

    <div class="checkin-info">
      {#each slice.items as item}
        <div class="info-box">
          {#if item.box_title}
            <h3>{item.box_title}</h3>
          {/if}

          {#if item.box_content}
            <div class="box-content">
              <PrismicRichText field={item.box_content} />
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .checkin-slice {
    margin-bottom: var(--space-4xl);
    padding-bottom: var(--space-4xl);
    border-bottom: 1px solid var(--color-border-light);
  }

  .checkin-slice:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .container {
    max-width: var(--container-xl);
    margin: 0 auto;
  }

  h2.heading-accent {
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: var(--space-xl);
    letter-spacing: -0.01em;
  }

  .checkin-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-xl);
  }

  .info-box {
    background: var(--color-background-elevated);
    padding: var(--space-xl);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-light);
  }

  .info-box h3 {
    font-family: var(--font-display);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: var(--space-md);
  }

  .box-content :global(p) {
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    margin-bottom: var(--space-md);
  }

  .box-content :global(p:last-child) {
    margin-bottom: 0;
  }

  .box-content :global(strong) {
    color: var(--color-text);
    font-weight: var(--font-weight-semibold);
  }

  .box-content :global(em) {
    color: var(--color-text-light);
    font-style: italic;
  }

  .box-content :global(ul),
  .box-content :global(ol) {
    margin: var(--space-md) 0;
    padding-left: var(--space-xl);
  }

  .box-content :global(li) {
    margin-bottom: var(--space-sm);
  }

  @media (max-width: 768px) {
    .checkin-info {
      grid-template-columns: 1fr;
      gap: var(--space-lg);
    }

    .info-box {
      padding: var(--space-lg);
    }

    h2.heading-accent {
      font-size: var(--font-size-xl);
    }
  }

  @media (max-width: 480px) {
    .checkin-slice {
      margin-bottom: var(--space-3xl);
      padding-bottom: var(--space-3xl);
    }
  }
</style>
