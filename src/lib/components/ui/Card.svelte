<!-- src/lib/components/ui/Card.svelte -->
<script>
  export let variant = "default";
  export let padding = "medium";
  export let href = null;
  export let hoverable = false;

  $: tag = href ? "a" : "div";
  $: classes = [
    "card",
    `card--${variant}`,
    `card--padding-${padding}`,
    (hoverable || href) && "card--hoverable",
  ]
    .filter(Boolean)
    .join(" ");
</script>

<svelte:element
  this={tag}
  class={classes}
  {href}
  role={href ? undefined : 'article'}
  tabindex={href ? undefined : 0}
  on:click
  on:keydown
  on:mouseenter
  on:mouseleave
  {...$$restProps}
>
  {#if $$slots.title}
    <div class="card__header">
      <slot name="title" />
    </div>
  {/if}

  <div class="card__content">
    <slot />
  </div>

  {#if $$slots.footer}
    <div class="card__footer">
      <slot name="footer" />
    </div>
  {/if}
</svelte:element>

<style>
  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    transition: all var(--transition-fast);
    text-decoration: none;
    color: inherit;
  }

  .card--hoverable:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-border);
  }

  /* Variants */
  .card--default {
    box-shadow: var(--shadow-sm);
  }

  .card--elevated {
    box-shadow: var(--shadow-md);
  }

  .card--elevated:hover {
    box-shadow: var(--shadow-xl);
  }

  .card--outlined {
    border: 2px solid var(--color-border);
    box-shadow: none;
  }

  .card--ghost {
    background-color: transparent;
    border: none;
    box-shadow: none;
  }

  /* Padding variants */
  .card--padding-none {
    padding: 0;
  }

  .card--padding-small .card__header,
  .card--padding-small .card__content,
  .card--padding-small .card__footer {
    padding: var(--space-md);
  }

  .card--padding-medium .card__header,
  .card--padding-medium .card__content,
  .card--padding-medium .card__footer {
    padding: var(--space-lg);
  }

  .card--padding-large .card__header,
  .card--padding-large .card__content,
  .card--padding-large .card__footer {
    padding: var(--space-xl);
  }

  /* Card sections */
  .card__header {
    border-bottom: 1px solid var(--color-border-light);
  }

  .card__header :global(h1),
  .card__header :global(h2),
  .card__header :global(h3),
  .card__header :global(h4),
  .card__header :global(h5),
  .card__header :global(h6) {
    margin: 0;
    color: var(--color-text);
  }

  .card__content {
    flex: 1;
  }

  .card__footer {
    border-top: 1px solid var(--color-border-light);
    margin-top: auto;
  }

  /* Remove borders for ghost variant */
  .card--ghost .card__header {
    border-bottom: none;
  }

  .card--ghost .card__footer {
    border-top: none;
  }

  /* Focus styles for interactive cards */
  a.card:focus {
    outline: 2px solid var(--color-secondary);
    outline-offset: 2px;
  }

</style>
