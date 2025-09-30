<!-- src/lib/components/ui/NavigationLinks.svelte -->
<script>
  import { t } from "$lib/stores/i18n.js";

  export let links;
  export let getLangLink;
  export let isActive;
  export let isMobile = false;
  export let onLinkClick = () => {};

  $: linkClass = isMobile ? 'mobile-nav-link' : 'nav-link';
</script>

{#each links as link}
  <a
    href={getLangLink(link.path)}
    class={linkClass}
    class:active={isActive(link.path)}
    on:click={onLinkClick}
  >
    {$t(link.labelKey)}
  </a>
{/each}

<style>
  /* Desktop nav link styles */
  .nav-link {
    text-decoration: none;
    color: var(--color-text);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-base);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
    position: relative;
    white-space: nowrap;
  }

  .nav-link:hover {
    color: var(--color-secondary);
    background-color: var(--color-background-alt);
  }

  .nav-link.active {
    color: var(--color-secondary);
    background-color: var(--color-background-alt);
  }

  .nav-link.active::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: var(--space-md);
    right: var(--space-md);
    height: 2px;
    background-color: var(--color-secondary);
    border-radius: var(--radius-sm);
  }

  /* Mobile nav link styles */
  .mobile-nav-link {
    display: block;
    padding: var(--space-md) var(--space-lg);
    text-decoration: none;
    color: var(--color-text);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-base);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
    margin-bottom: var(--space-sm);
  }

  .mobile-nav-link:last-child {
    margin-bottom: 0;
  }

  .mobile-nav-link:hover,
  .mobile-nav-link.active {
    background-color: var(--color-background-alt);
    color: var(--color-secondary);
  }

  /* Mobile responsive - hide desktop links */
  @media (max-width: 768px) {
    .nav-link {
      display: none;
    }
  }
</style>