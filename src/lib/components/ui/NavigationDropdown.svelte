<!-- src/lib/components/ui/NavigationDropdown.svelte -->
<script>
  import { t } from "$lib/stores/i18n.js";

  export let label = '';
  export let items = []; // [{path, labelKey, icon?}]
  export let isActive = false;
  export let getLangLink;
  export let isMobile = false;
  export let onLinkClick = () => {};

  let isOpen = false;
  let timeoutId;

  // Hover logic with delay for desktop
  function handleMouseEnter() {
    if (isMobile) return;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => isOpen = true, 150);
  }

  function handleMouseLeave() {
    if (isMobile) return;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => isOpen = false, 200);
  }

  // Click logic for mobile
  function handleClick(event) {
    if (!isMobile) return;
    event.preventDefault();
    isOpen = !isOpen;
  }

  // Handle sub-link click
  function handleSubLinkClick() {
    isOpen = false;
    onLinkClick();
  }

  $: linkClass = isMobile ? 'mobile-nav-link' : 'nav-link';
</script>

<div
  class="nav-dropdown"
  class:mobile={isMobile}
  class:open={isOpen}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  role="navigation"
>
  <a
    href={getLangLink(items[0]?.path || '#')}
    class={linkClass}
    class:active={isActive}
    on:click={handleClick}
    role="button"
    aria-expanded={isOpen}
    aria-haspopup="true"
  >
    {label}
    <svg
      class="dropdown-icon"
      class:open={isOpen}
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 1.5L6 6.5L11 1.5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </a>

  {#if isOpen}
    <div
      class="dropdown-menu"
      class:mobile={isMobile}
      role="menu"
    >
      {#each items as item}
        <a
          href={getLangLink(item.path)}
          class="dropdown-item"
          class:mobile={isMobile}
          on:click={handleSubLinkClick}
          role="menuitem"
        >
          {$t(item.labelKey)}
        </a>
      {/each}
    </div>
  {/if}
</div>

<style>
  .nav-dropdown {
    position: relative;
    display: inline-block;
  }

  /* Desktop styles */
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
    display: flex;
    align-items: center;
    gap: var(--space-xs);
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

  .dropdown-icon {
    transition: transform var(--transition-fast);
    flex-shrink: 0;
  }

  .dropdown-icon.open {
    transform: rotate(180deg);
  }

  /* Desktop dropdown menu */
  .dropdown-menu:not(.mobile) {
    position: absolute;
    top: 100%;
    left: 0;
    background: var(--color-background-elevated);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    padding: var(--space-sm);
    min-width: 200px;
    z-index: 1000;
    opacity: 0;
    transform: translateY(-8px);
    animation: dropdown-enter 0.2s ease-out forwards;
  }

  @keyframes dropdown-enter {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .dropdown-item:not(.mobile) {
    display: block;
    padding: var(--space-sm) var(--space-md);
    color: var(--color-text);
    text-decoration: none;
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
  }

  .dropdown-item:not(.mobile):hover {
    background-color: var(--color-background-alt);
    color: var(--color-secondary);
    transform: translateX(4px);
  }

  .dropdown-item:not(.mobile):focus {
    outline: 2px solid var(--color-secondary);
    outline-offset: 2px;
  }

  /* Mobile styles */
  .nav-dropdown.mobile {
    display: block;
    width: 100%;
  }

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
    justify-content: space-between;
    align-items: center;
    display: flex;
  }

  .mobile-nav-link:hover,
  .mobile-nav-link.active {
    background-color: var(--color-background-alt);
    color: var(--color-secondary);
  }

  .dropdown-menu.mobile {
    background: var(--color-background-alt);
    border-radius: var(--radius-md);
    padding: var(--space-sm);
    margin-top: var(--space-xs);
    margin-left: var(--space-lg);
    border-left: 2px solid var(--color-secondary);
  }

  .dropdown-item.mobile {
    display: block;
    padding: var(--space-sm) var(--space-md);
    color: var(--color-text);
    text-decoration: none;
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
    font-size: var(--font-size-sm);
    margin-bottom: var(--space-xs);
  }

  .dropdown-item.mobile:last-child {
    margin-bottom: 0;
  }

  .dropdown-item.mobile:hover {
    background-color: var(--color-background);
    color: var(--color-secondary);
  }

  /* Hide on mobile screens when not in mobile mode */
  @media (max-width: 768px) {
    .nav-dropdown:not(.mobile) {
      display: none;
    }
  }
</style>