<!-- src/lib/slices/TransportSlice.svelte -->
<script>
  import Icon from '$lib/components/ui/Icon.svelte';
  import { PrismicRichText } from '@prismicio/svelte';

  export let slice;
</script>

<section class="transport-slice">
  <div class="container">
    {#if slice.primary.heading}
      <h2 class="heading-accent">{slice.primary.heading}</h2>
    {/if}

    {#if slice.primary.description}
      <div class="description">
        <PrismicRichText field={slice.primary.description} />
      </div>
    {/if}

    <div class="transport-options">
      {#each slice.items as item}
        <div class="transport-item">
          {#if item.icon_name}
            <h3>
              <Icon name={item.icon_name} size={48} />
              {item.transport_title}
            </h3>
          {:else}
            <h3>{item.transport_title}</h3>
          {/if}

          {#if item.transport_content}
            <div class="transport-content">
              <PrismicRichText field={item.transport_content} />
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .transport-slice {
    margin-bottom: var(--space-4xl);
    padding-bottom: var(--space-4xl);
    border-bottom: 1px solid var(--color-border-light);
  }

  .transport-slice:last-child {
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

  .description {
    margin-bottom: var(--space-xl);
  }

  .description :global(p) {
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    margin-bottom: var(--space-md);
  }

  .transport-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-xl);
  }

  .transport-item {
    background: var(--color-background-elevated);
    padding: var(--space-xl);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-light);
  }

  .transport-item h3 {
    font-family: var(--font-display);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: var(--space-md);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .transport-content :global(p) {
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    margin-bottom: var(--space-md);
  }

  .transport-content :global(p:last-child) {
    margin-bottom: 0;
  }

  .transport-content :global(strong) {
    color: var(--color-text);
    font-weight: var(--font-weight-semibold);
  }

  .transport-content :global(ol),
  .transport-content :global(ul) {
    margin: var(--space-md) 0;
    padding-left: var(--space-xl);
  }

  .transport-content :global(li) {
    margin-bottom: var(--space-sm);
    line-height: var(--line-height-relaxed);
  }

  @media (max-width: 768px) {
    .transport-options {
      grid-template-columns: 1fr;
    }

    .transport-item {
      padding: var(--space-lg);
    }

    h2.heading-accent {
      font-size: var(--font-size-xl);
    }
  }

  @media (max-width: 480px) {
    .transport-slice {
      margin-bottom: var(--space-3xl);
      padding-bottom: var(--space-3xl);
    }
  }
</style>
