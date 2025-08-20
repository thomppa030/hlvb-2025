<!-- src/lib/components/ui/Header.svelte -->
<script>
  import { page } from "$app/stores";
  import Button from "./Button.svelte";
  import LanguageSwitcher from "./LanguageSwitcher.svelte";
  import { t } from "$lib/stores/i18n.js";

  // Check if current route is active - reactive to page changes
  $: isActive = (route) => {
    const currentPath = $page.url.pathname;
    if (route === "/" && currentPath === "/") return true;
    if (route !== "/" && currentPath.startsWith(route)) return true;
    return false;
  };

  function handleBooking() {
    window.open("https://onepagebooking.com/beethoven", "_blank");
  }
</script>

<header class="header">
  <div class="container">
    <nav class="nav">
      <!-- Logo/Brand -->
      <a href="/" class="brand" class:active={isActive("/")}>
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

      <!-- Navigation Links -->
      <div class="nav-links">
        <a href="/" class="nav-link" class:active={isActive("/")}> 
          {$t('nav.home')}
        </a>
        <a href="/reviews" class="nav-link" class:active={isActive("/reviews")}>
          {$t('nav.reviews')}
        </a>
        <a href="/social" class="nav-link" class:active={isActive("/social")}>
          Social
        </a>
        <a href="/test" class="nav-link" class:active={isActive("/test")}>
          {$t('nav.style')}
        </a>
      </div>

      <!-- Header Actions -->
      <div class="header-actions">
        <!-- Book Now Button -->
        <Button
          variant="accent"
          size="medium"
          on:click={handleBooking}
          class="book-cta"
        >
          {$t('nav.book_now')}
        </Button>

        <!-- Language Switcher -->
        <LanguageSwitcher />
      </div>
    </nav>
  </div>
</header>

<style>
  .header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    transition: all var(--transition-normal);
    height: 100px;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
    height: 100%;
  }

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    gap: var(--space-xl);
  }

  .brand {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--color-text);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-xl);
    transition: all var(--transition-fast);
  }

  .brand-logo {
    height: 70px;
    width: auto;
    object-fit: contain;
    transition: transform var(--transition-fast);
  }

  .brand:hover .brand-logo {
    transform: scale(1.05);
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: var(--space-xl);
  }

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

  .header-actions {
    display: flex;
    align-items: center;
    gap: var(--space-lg);
  }

  :global(.book-cta) {
    white-space: nowrap;
  }

  /* Tablet responsive */
  @media (max-width: 1200px) {
    .nav {
      gap: var(--space-lg);
    }

    .nav-links {
      gap: var(--space-lg);
    }

    .header-actions {
      gap: var(--space-md);
    }
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .header {
      height: 80px;
    }

    .brand-logo {
      height: 50px;
    }

    .container {
      padding: 0 var(--space-md);
    }

    .nav-links {
      display: none;
    }

    :global(.book-cta) {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 var(--space-sm);
    }

    .header-actions {
      gap: var(--space-sm);
    }

    .brand-logo {
      height: 45px;
    }
  }
</style>