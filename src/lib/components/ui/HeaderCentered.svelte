<!-- src/lib/components/ui/HeaderCentered.svelte -->
<script>
  import { page } from "$app/stores";
  import LanguageSwitcher from "./LanguageSwitcher.svelte";
  import NavigationLinks from "./NavigationLinks.svelte";
  import { t, currentLanguage } from "$lib/stores/i18n.js";
  import { isActiveRoute, getLangLink as getLink } from "$lib/utils/navigation.js";

  // Mobile menu state
  let mobileMenuOpen = false;

  // Toggle mobile menu
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  // Close mobile menu when navigating
  $: $page && (mobileMenuOpen = false);

  // Navigation links configuration
  const navLinks = [
    { path: '/', labelKey: 'nav.home' },
    { path: '/reviews', labelKey: 'nav.reviews' },
    { path: '/infos', labelKey: 'nav.infos' },
    { path: '/aktuelles', labelKey: 'nav.aktuelles' }
  ];

  // Simplified with utilities
  $: isActive = (route) => isActiveRoute($page.url.pathname, route, $currentLanguage);
  $: getLangLink = (path) => getLink(path, $currentLanguage);
</script>

<header class="header-centered">
  <div class="container">
    <nav class="nav">
      <!-- Centered navigation group -->
      <div class="nav-group">
        <!-- Left side links -->
        <div class="nav-side nav-left">
          <NavigationLinks
            links={navLinks.slice(0, 2)}
            {getLangLink}
            {isActive}
          />
        </div>

        <!-- Centered Logo -->
        <a href={getLangLink("/")} class="brand" class:active={isActive("/")}>
          <picture>
            <source
              media="(max-width: 480px)"
              srcset="/logo-mobile-opt.webp"
              type="image/webp"
            />
            <source
              media="(max-width: 768px)"
              srcset="/logo-mobile.webp"
              type="image/webp"
            />
            <img
              src="/cropped-Logo-Taupe.webp"
              alt="Hotel Ludwig van Beethoven"
              class="brand-logo"
              width="180"
              height="100"
              loading="eager"
              decoding="sync"
            />
          </picture>
        </a>

        <!-- Right side links -->
        <div class="nav-side nav-right">
          <NavigationLinks
            links={navLinks.slice(2)}
            {getLangLink}
            {isActive}
          />
        </div>
      </div>

      <!-- Right side actions (further away) -->
      <div class="nav-actions">
        <!-- Hamburger Menu Button (Mobile) -->
        <button
          class="hamburger-menu"
          class:active={mobileMenuOpen}
          on:click={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>

        <!-- Language Switcher -->
        <LanguageSwitcher />
      </div>
    </nav>
  </div>

  <!-- Mobile Navigation Menu -->
  <nav class="mobile-nav" class:active={mobileMenuOpen}>
    <NavigationLinks
      links={navLinks}
      {getLangLink}
      {isActive}
      isMobile={true}
      onLinkClick={() => mobileMenuOpen = false}
    />
  </nav>
</header>

<style>
  .header-centered {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    transition: all var(--transition-normal);
    height: 110px;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
    height: 100%;
  }

  .nav {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    position: relative;
  }

  .nav-group {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: var(--space-lg);
    width: 100%;
    max-width: 800px;
  }

  .nav-side {
    display: flex;
    align-items: center;
    gap: var(--space-lg);
  }

  .nav-left {
    justify-content: flex-end;
  }

  .nav-right {
    justify-content: flex-start;
  }

  .nav-actions {
    position: absolute;
    right: var(--space-lg);
    display: flex;
    align-items: center;
  }

  .brand {
    display: flex;
    align-items: center;
    justify-self: center;
    text-decoration: none;
    color: var(--color-text);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-xl);
    transition: all var(--transition-fast);
  }

  .brand-logo {
    height: 90px;
    width: auto;
    object-fit: contain;
    transition: transform var(--transition-fast);
  }

  .brand:hover .brand-logo {
    transform: scale(1.05);
  }


  /* Hamburger Menu Styles */
  .hamburger-menu {
    display: none;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: var(--space-sm);
    width: 40px;
    height: 40px;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin-right: var(--space-md);
  }

  .hamburger-line {
    display: block;
    width: 24px;
    height: 2px;
    background-color: var(--color-text);
    transition: all var(--transition-fast);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .hamburger-line:nth-child(1) {
    top: 12px;
  }

  .hamburger-line:nth-child(2) {
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  .hamburger-line:nth-child(3) {
    bottom: 12px;
  }

  .hamburger-menu.active .hamburger-line:nth-child(1) {
    top: 50%;
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
  }

  .hamburger-menu.active .hamburger-line:nth-child(2) {
    opacity: 0;
  }

  .hamburger-menu.active .hamburger-line:nth-child(3) {
    bottom: 50%;
    transform: translateX(-50%) translateY(50%) rotate(-45deg);
  }

  /* Mobile Navigation Menu */
  .mobile-nav {
    display: none;
    position: fixed;
    top: 110px;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    padding: var(--space-md);
    transform: translateY(-100%);
    opacity: 0;
    transition: all var(--transition-normal);
    z-index: 99;
  }

  .mobile-nav.active {
    transform: translateY(0);
    opacity: 1;
  }


  /* Tablet responsive */
  @media (max-width: 1024px) {
    .header-centered {
      height: 90px;
    }

    .nav-group {
      gap: var(--space-lg);
    }

    .brand {
      margin: 0 var(--space-md);
    }

    .brand-logo {
      height: 70px;
    }

    .nav-actions {
      right: var(--space-md);
    }
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .header-centered {
      height: 80px;
    }

    .brand-logo {
      height: 60px;
    }

    .container {
      padding: 0 var(--space-md);
    }

    .nav-group {
      gap: var(--space-md);
      margin-right: 80px; /* Make room for actions */
    }


    .brand {
      margin: 0;
    }

    .nav-actions {
      right: var(--space-sm);
      display: flex;
      align-items: center;
    }

    /* Show hamburger menu on mobile */
    .hamburger-menu {
      display: flex;
    }

    /* Show mobile nav when active */
    .mobile-nav {
      display: block;
      top: 80px; /* Match header height */
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 var(--space-sm);
    }

    .brand-logo {
      height: 50px;
    }

    .mobile-nav {
      top: 80px; /* Match header height */
    }
  }

  /* Dark mode support */
  :global([data-theme="dark"]) .header-centered {
    background: rgba(20, 20, 20, 0.98);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  :global([data-theme="dark"]) .mobile-nav {
    background: rgba(20, 20, 20, 0.98);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
</style>
