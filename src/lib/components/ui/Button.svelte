<!-- src/lib/components/ui/Button.svelte -->
<script>
  export let variant = "primary";
  export let size = "medium";
  export let type = "button";
  export let disabled = false;
  export let href = null;
  export let target = null;
  export let loading = false;

  $: tag = href ? "a" : "button";
  $: classes = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    disabled && "btn--disabled",
    loading && "btn--loading",
  ]
    .filter(Boolean)
    .join(" ");
</script>

<svelte:element
  this={tag}
  class={classes}
  {type}
  {href}
  {target}
  {disabled}
  role={href ? undefined : 'button'}
  tabindex={disabled ? -1 : 0}
  on:click
  on:keydown
  on:mouseenter
  on:mouseleave
  {...$$restProps}
>
  {#if loading}
    <span class="btn__loader" aria-hidden="true"></span>
  {/if}
  <span class="btn__content" class:btn__content--hidden={loading}>
    <slot />
  </span>
</svelte:element>

<style>
  .btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    font-family: var(--font-primary);
    font-weight: var(--font-weight-medium);
    line-height: 1;
    text-decoration: none;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
    white-space: nowrap;
    user-select: none;
  }

  .btn:focus {
    outline: 2px solid var(--color-secondary);
    outline-offset: 2px;
  }

  .btn:disabled,
  .btn--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Variants */
  .btn--primary {
    background-color: var(--color-primary);
    color: var(--color-text-inverse);
  }

  .btn--primary:hover:not(:disabled) {
    background-color: var(--color-primary-light);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .btn--secondary {
    background-color: var(--color-secondary);
    color: var(--color-text-inverse);
  }

  .btn--secondary:hover:not(:disabled) {
    background-color: var(--color-secondary-light);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .btn--outline {
    background-color: transparent;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
  }

  .btn--outline:hover:not(:disabled) {
    background-color: var(--color-primary);
    color: var(--color-text-inverse);
  }

  .btn--ghost {
    background-color: transparent;
    color: var(--color-text);
  }

  .btn--ghost:hover:not(:disabled) {
    background-color: var(--color-background-alt);
  }

  /* Sizes */
  .btn--small {
    padding: var(--space-xs) var(--space-md);
    font-size: var(--font-size-sm);
  }

  .btn--medium {
    padding: var(--space-sm) var(--space-lg);
    font-size: var(--font-size-base);
  }

  .btn--large {
    padding: var(--space-md) var(--space-xl);
    font-size: var(--font-size-lg);
  }

  /* Loading state */
  .btn--loading {
    pointer-events: none;
  }

  .btn__content--hidden {
    opacity: 0;
  }

  .btn__loader {
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Dark theme adjustments */
  :global([data-theme="dark"]) .btn--primary {
    background-color: var(--color-text);
    color: var(--color-background);
  }

  :global([data-theme="dark"]) .btn--primary:hover:not(:disabled) {
    background-color: var(--color-text-light);
  }

  :global([data-theme="dark"]) .btn--secondary {
    background-color: var(--color-secondary);
    color: var(--color-text);
  }

  :global([data-theme="dark"]) .btn--secondary:hover:not(:disabled) {
    background-color: var(--color-secondary-light);
    box-shadow: 0 4px 6px -1px rgba(255, 255, 255, 0.1);
  }

  :global([data-theme="dark"]) .btn--outline {
    border-color: var(--color-text);
    color: var(--color-text);
  }

  :global([data-theme="dark"]) .btn--outline:hover:not(:disabled) {
    background-color: var(--color-text);
    color: var(--color-background);
  }

  :global([data-theme="dark"]) .btn--ghost {
    color: var(--color-text-light);
  }

  :global([data-theme="dark"]) .btn--ghost:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--color-text);
  }
</style>
