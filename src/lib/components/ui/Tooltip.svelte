<!-- src/lib/components/ui/Tooltip.svelte -->
<script>
  export let text = '';

  let showTooltip = false;
</script>

<span
  class="tooltip-wrapper"
  on:mouseenter={() => showTooltip = true}
  on:mouseleave={() => showTooltip = false}
  on:focus={() => showTooltip = true}
  on:blur={() => showTooltip = false}
  role="tooltip"
  tabindex="0"
>
  <span class="tooltip-icon">!</span>
  {#if showTooltip}
    <span class="tooltip-content">
      {text}
    </span>
  {/if}
</span>

<style>
  .tooltip-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: help;
    margin-left: var(--space-xs);
  }

  .tooltip-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--color-secondary);
    color: var(--color-text-inverse);
    font-size: 13px;
    font-weight: var(--font-weight-bold);
    line-height: 1;
    transition: all var(--transition-fast);
  }

  .tooltip-wrapper:hover .tooltip-icon,
  .tooltip-wrapper:focus .tooltip-icon {
    background-color: var(--color-secondary-light);
    transform: scale(1.1);
  }

  .tooltip-content {
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-background-elevated);
    color: var(--color-text);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
    font-size: var(--font-size-xs);
    white-space: nowrap;
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--color-border-light);
    z-index: 1000;
    pointer-events: none;
    animation: fadeIn 0.2s ease-in-out;
  }

  .tooltip-content::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: var(--color-background-elevated);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  .tooltip-wrapper:focus {
    outline: 2px solid var(--color-secondary);
    outline-offset: 2px;
    border-radius: 50%;
  }
</style>
