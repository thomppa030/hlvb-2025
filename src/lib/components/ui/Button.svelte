<!-- src/lib/components/ui/Button.svelte -->
<script>
  export let variant = "primary";
  export let size = "medium";
  export let type = "button";
  export let disabled = false;
  export let href = undefined;
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

  .btn--outline-light {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.8);
  }

  .btn--outline-light:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: white;
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .btn--ghost {
    background-color: transparent;
    color: var(--color-text);
  }

  .btn--ghost:hover:not(:disabled) {
    background-color: var(--color-background-alt);
  }

  .btn--accent {
    background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-secondary) 100%);
    color: white;
    font-weight: var(--font-weight-semibold);
    border: 2px solid var(--color-accent);
    outline: 2px solid rgba(0, 49, 83, 0.3);
    outline-offset: 1px;
  }

  .btn--accent:hover:not(:disabled) {
    background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-light) 100%);
    transform: translateY(-1px);
    border-color: var(--color-secondary);
    outline: 2px solid rgba(0, 49, 83, 0.5);
    outline-offset: 2px;
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

</style>
