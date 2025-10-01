<!-- src/lib/slices/ContactSlice.svelte -->
<script>
  import Icon from '$lib/components/ui/Icon.svelte';
  import { PrismicRichText } from '@prismicio/svelte';

  export let slice;
</script>

<section class="contact-slice">
  <div class="container">
    {#if slice.primary.heading}
      <h2 class="heading-accent-center">{slice.primary.heading}</h2>
    {/if}

    <div class="contact-content">
      {#if slice.primary.description}
        <div class="contact-text">
          <PrismicRichText field={slice.primary.description} />
        </div>
      {/if}

      <div class="contact-info">
        {#each slice.items as item}
          <div class="contact-item">
            {#if item.icon_name}
              <h3>
                <Icon name={item.icon_name} size={32} />
                {item.contact_title}
              </h3>
            {:else}
              <h3>{item.contact_title}</h3>
            {/if}

            {#if item.contact_content}
              <div class="contact-item-content">
                <PrismicRichText field={item.contact_content} />
              </div>
            {/if}

            {#if item.additional_info}
              <p class="additional-info">{item.additional_info}</p>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .contact-slice {
    background: var(--color-background-elevated);
    border-radius: var(--radius-lg);
    padding: var(--space-4xl);
    border: 1px solid var(--color-border-light);
    margin-bottom: var(--space-5xl);
  }

  .container {
    max-width: var(--container-lg);
    margin: 0 auto;
  }

  h2.heading-accent-center {
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: var(--space-xl);
    text-align: center;
    letter-spacing: -0.01em;
  }

  .contact-content {
    display: grid;
    gap: var(--space-4xl);
  }

  .contact-text :global(p) {
    font-family: var(--font-primary);
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
    color: var(--color-text);
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }

  .contact-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-xl);
  }

  .contact-item {
    background: var(--color-background-alt);
    padding: var(--space-xl);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-light);
    text-align: center;
  }

  .contact-item h3 {
    font-family: var(--font-display);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: var(--space-md);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
  }

  .contact-item-content :global(p) {
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    color: var(--color-text);
    margin-bottom: var(--space-sm);
  }

  .contact-item-content :global(a) {
    color: var(--color-secondary);
    text-decoration: none;
    border-bottom: 1px solid var(--color-secondary-light);
    transition: var(--transition-fast);
  }

  .contact-item-content :global(a:hover) {
    color: var(--color-secondary-light);
    border-bottom-color: var(--color-secondary-light);
  }

  .additional-info {
    font-family: var(--font-primary);
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
    margin-top: var(--space-sm);
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    .contact-slice {
      padding: var(--space-3xl);
    }

    .contact-info {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .contact-slice {
      padding: var(--space-2xl);
    }

    .contact-item {
      padding: var(--space-lg);
    }
  }
</style>
